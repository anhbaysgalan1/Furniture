const fs = require('fs');
const moment = require('moment');
const crypto = require('crypto');
const config = require('../../config/config.json');
const Env = require('./env');
const secret = require('../../config/secret.json');
const lang = require('../../lang/lang_backend.json');
const DefaultLangCode = config.default_language;

const UPLOAD_DIR = Env.BackendUploadBasedir;

module.exports = {
    localizedText: function(langCode, key, words) {
        if (!lang[key]) {
            return key;
        }
        let txt = lang[key][langCode] || lang[key][DefaultLangCode] || key;
        if (!words) {
            return txt;
        }
        return replace(txt, words);
    },

    getMsgObjectFromKey: function(reqOrLanguageCode, key, words) {
        var langCode = typeof reqOrLanguageCode === 'string' ? reqOrLanguageCode : reqOrLanguageCode.headers.lang_code;
        var result = {
            message: key
        };
        if (!langCode) {
            langCode = DefaultLangCode;
        }
        if (!lang[key]) {
            return result;
        }
        result.ui_message = lang[key][langCode] || lang[key][DefaultLangCode];
        result.message = key;
        if (!words) {
            return result;
        }
        result.ui_message = replace(result.ui_message, words);
        return result;
    },

    getUiMsgFromKey: function(reqOrLanguageCode, key, words) {
        return this.getMsgObjectFromKey(reqOrLanguageCode, key, words)['ui_message'];
    },

    getFullName: function(req, familyName, givenName) {
        var langCode = req.headers.lang_code || DefaultLangCode;
        if (langCode == 'vi') {
            return familyName + ' ' + givenName;
        } else {
            return givenName + ' ' + familyName;
        }
    },

    // req: request object of express
    getFullUrlFromRequest(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    },

    // Chấp nhận cả empty string
    checkRequiredParams: function(input, requiredParams) {
        if (!requiredParams) {
            return input;
        }
        for (var i = 0; i < requiredParams.length; i++) {
            var keys = requiredParams[i].split('.');
            var obj = input[keys[0]];
            var path = keys[0];
            if (obj == undefined || obj == null) {
                return { error: 'Missing param ' + path };
            }
            if (keys.length <= 1) {
                continue;
            }
            for (var j = 1; j < keys.length; j++) {
                path = path + '.' + keys[j];
                obj = obj[keys[j]];
                if (obj == undefined || obj == null) {
                    return { error: 'Missing param ' + path };
                }
            }
        }
        return input;
    },

    // Bình thường thì sẽ ko chấp nhận empty string
    // Nếu param nào empty mà có acceptEmptyString = true thì sẽ chấp nhận param đấy
    // example of requiredParams:
    // [
    //   {
    //     name: 'staff_type',
    //     possibleValues: [1, 2, 3],
    //     dataType: 'array'
    //   },
    //   'name.familyName',
    //   'skype'
    // ]
    //
    // input should be this
    // {
    //   staff_type: 1,
    //   skype: "xxx",
    //   name : {
    //     familyName: "John"
    //   }
    // }
    checkRequiredParams2: function(input, requiredParams) {
        if (!requiredParams || requiredParams.length == 0) return input;

        var self = this;
        // dataType: must be result from typeof (E.g: 'string', 'number', 'boolean', 'array'...)
        // acceptEmptyString: áp dụng cho cả string và array, để chấp nhận mảng rỗng và string rỗng
        var checkValue = function(value, key, acceptValues, acceptEmptyString, dataType) {
            if (dataType) {
                let errmsg = key + ' must be ' + dataType + ', but value is ' + value;
                let err = (dataType == 'array' && !Array.isArray(value)) /*|| (dataType != 'array' && dataType !== typeof value)*/ ;
                if (err) {
                    return errmsg;
                }
                if (dataType === 'number' && isNaN(value)) {
                    return errmsg;
                } else if (dataType === 'boolean' && !self.isBoolean(self.toBool(value))) {
                    return errmsg;
                }
            }
            if (!value && dataType !== 'number' && dataType !== 'boolean') {
                if (acceptEmptyString === true && value === "") {
                    return null;
                }
                return 'Param ' + key + ' is missing or empty';
            }
            if (acceptValues) {
                var valueNotValid = true;
                for (var v of acceptValues) {
                    if (v == value) {
                        valueNotValid = false;
                        break;
                    }
                }
                if (valueNotValid) {
                    return 'Value of ' + key + ' is not valid';
                }
            }
            return null;
        };

        for (var p of requiredParams) {
            var obj, path;
            var fullPath = typeof p === 'string' ? p : p.name;
            var keys = fullPath.split('.');

            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                if (j === 0) {
                    obj = input[key];
                    path = key;
                } else {
                    obj = obj[key];
                    path = path + '.' + key;
                }

                var msg;
                if (j === keys.length - 1) {
                    // last node
                    msg = checkValue(obj, path, p.possibleValues, p.acceptEmptyString, p.dataType);
                    if (!msg) {
                        if (p.dataType == 'number' && !this.isNumber(obj)) {
                            // make sure dataType is exactly number
                            this.setObjectPropertyWithPath(path, input, Number(obj));
                        } else if (p.dataType == 'boolean' && !this.isBoolean(obj)) {
                            // make sure dataType is exactly boolean
                            this.setObjectPropertyWithPath(path, input, this.toBool(obj));
                        }
                    }
                } else {
                    // middle node
                    msg = checkValue(obj, path);
                }
                if (msg) {
                    return { error: msg };
                }
            }
        }
        return input;
    },

    checkRequiredParamsIfAvailable(input, requiredParams) {
        let keys = [];
        for (let key of requiredParams) {
            let keyName = this.isString(key) ? key : key.name;
            if (typeof input[keyName] === 'undefined') {
                continue;
            }
            keys.push(key);
        }
        return this.checkRequiredParams2(input, keys);
    },

    checkRequiredParamsProcedure(input, requiredParams) {
        if (!requiredParams || requiredParams.length === 0) {
            return input;
        }

        function check(params, key) {
            // if (typeof input[key] === 'undefined' || !input[key]) {
            if (typeof input[key] === 'undefined' || input[key] === '' || input[key] === null) {
                return 'Param ' + key + ' is missing';
            }
            return null;
        }

        let error = null;
        for (let p of requiredParams) {
            if (typeof p === 'string') {
                error = check(input, p);
                if (error) break;
            } else {
                let key = p.name;
                error = check(input, key);
                if (error) {
                    break;
                } else {
                    if (p.dataType) {
                        if (p.dataType === 'array') {
                            if (!Array.isArray(input[key])) {
                                error = 'Param ' + key + ' must be ' + p.dataType;
                                if (p.message) error = p.message;
                                break;
                            } else {
                                if (!input[key].length) {
                                    error = "Param " + key + " don't accept empty " + p.dataType;
                                    break;
                                }
                            }
                        } else {
                            if ((p.dataType === 'number' && isNaN(input[key])) || typeof input[key] !== p.dataType) {
                                error = 'Param ' + key + ' must be ' + p.dataType;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (error) {
            return { 'error': error }
        }
        return input;
    },

    fillOptionalFields(from, to, opsFields) {
        for (const key of opsFields) {
            if (from[key]) {
                to[key] = from[key];
                if (typeof to[key] === 'string') {
                    to[key] = to[key].trim();
                }
            }
        }
        return to;
    },

    // Hàm này xử lý input data, chỉ lấy những data cho phép, loại hết những data linh tinh.
    // Nếu trường nào mà có kiểu object thì khai báo như này 'field.sub1.sub21', 'field.sub1.sub22'
    // acceptedParams: là 1 mảng, các phần tử có thể là 1 trong 2 kiểu
    //   string: đây là name (tên để truy cập vào dữ liệu, VD input[name])
    //   object: đây là description, sẽ có dạng như ví dụ sau:
    //    {
    //        name: 'gender',           // có thể dạng sub object như sau 'obj.sub1.sub21', 'obj.sub1.sub22'
    //        dataType: 'string',       // 'string', 'number', 'boolean', 'array'
    //        acceptEmpty: false,       // chấp nhận empty string, empty array
    //        possibleValues: ['male', 'female'],
    //        required: true
    //    }
    // skipIfNotExist: nếu 1 trường required nào đấy bị thiếu trong input thì bỏ qua, ko báo lỗi
    //
    // if (myvar) is to make sure myvar is not one of these values: null, undefined, 0, '', false, NaN
    preProcessInputParams(input, acceptedParams, skipIfNotExist) {
        if (!acceptedParams || acceptedParams.length == 0) {
            return input;
        }

        // dataType: must be result from typeof (E.g: 'string', 'number', 'boolean', 'array')
        var checkValue = function(value, key, acceptValues, acceptEmpty, dataType, required) {
            if (dataType) {
                let errmsg = key + ' must be ' + dataType;
                let err = (dataType == 'array' && !Array.isArray(value)) || (dataType != 'array' && dataType !== typeof value);
                if (err) {
                    return errmsg;
                }
                if (dataType === 'number' && isNaN(value)) {
                    return errmsg;
                }
            }

            if (!acceptEmpty) {
                let errmsg = 'Param ' + key + ' is missing or empty';
                if ((dataType === 'array' || dataType === 'string') && (!value || value.length == 0)) {
                    return errmsg;
                }
            }

            if (required && (!value && value !== 0)) {
                if (skipIfNotExist) {
                    return null;
                } else {
                    return 'Param ' + key + ' is missing or empty';
                }
            }

            if (acceptValues) {
                var valueNotValid = true;
                for (var v of acceptValues) {
                    if (v == value) {
                        valueNotValid = false;
                        break;
                    }
                }
                if (valueNotValid) {
                    return 'Value of ' + key + ' is not valid';
                }
            }
            return null;
        };

        for (var p of acceptedParams) {
            var obj, path;
            var fullPath = typeof p === 'string' ? p : p.name;
            var keys = fullPath.split('.');

            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                if (j == 0) {
                    obj = input[key];
                    path = key;
                } else {
                    obj = obj[key];
                    path = path + '.' + key;
                }

                var msg;
                if (j == keys.length - 1) {
                    // last node
                    msg = checkValue(obj, path, p.possibleValues, p.acceptEmpty, p.dataType, p.required);
                } else {
                    // middle node
                    msg = checkValue(obj, path);
                }
                if (msg) {
                    return { error: msg };
                }
            }
        }
        return this.getAcceptableFields(input, acceptedParams);
    },

    getAcceptableFieldsName(acceptableFields) {
        let str = '';
        for (let i = 0; i < acceptableFields.length; i++) {
            let name = '';
            if (typeof acceptableFields[i] === 'string') {
                name = acceptableFields[i];
            } else {
                name = acceptableFields[i].name;
            }
            if (str.length > 0) {
                str += ', ';
            }
            str += name;
        }
        return str;
    },

    getAcceptableFields(from, acceptableFields) {
        const result = {};
        for (const keyPath of acceptableFields) {
            var fullPath = typeof keyPath === 'string' ? keyPath : keyPath.name;
            const value = this.getObjectPropertyWithPath(fullPath, from);
            if (this.isUndefined(value)) {
                continue;
            }
            this.setObjectPropertyWithPath(fullPath, result, value);
        }
        return result;
    },

    // propertyPath: a string with format 'abc.def.ghi'
    getObjectPropertyWithPath: function(propertyPath, obj) {
        if (this.isUndefined(obj)) {
            return undefined;
        }
        var keys = propertyPath.split('.'),
            p = obj;
        for (var i = 0; i < keys.length; i++) {
            if (!this.objectHasProperty(p, keys[i])) {
                return undefined;
            }
            if (this.isUndefined(p[keys[i]])) {
                return undefined;
            }
            p = p[keys[i]];
        }
        return p;
    },

    // propertyPath: a string with format 'abc.def.ghi'
    setObjectPropertyWithPath: function(propertyPath, obj, value) {
        if (!obj) {
            obj = {};
        }
        var keys = propertyPath.split('.'),
            p = obj;
        for (var i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                p[keys[i]] = value;
            } else {
                p[keys[i]] = p[keys[i]] || {};
                p = p[keys[i]];
            }
        }
        return obj;
    },

    getErrorString: function(error) {
        if (error == undefined || error == null) {
            return error;
        }
        if (typeof error === 'string' || error instanceof String) {
            return error;
        } else if (error.message) {
            return error.message;
        } else if (error.Message) {
            return error.Message;
        } else if (error.ui_message) {
            return error.ui_message;
        } else {
            return error.toString();
        }
    },

    parseDateString: function(str) {
        if (!str || str == '00-00-0000') {
            return '';
        }

        var m;
        const formats = ["D-M-YYYY", "D/M/YYYY"];
        for (var i = 0; i < formats.length; i++) {
            m = moment(str, formats[i]);
            if (m.isValid()) {
                return m.format("YYYY-MM-DD");
            }
        }
        return '';
    },

    createArray: function() {
        var arr = [];
        if (arguments && arguments.length > 0) {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i]) {
                    arr.push(arguments[i]);
                }
            }
        }
        return arr;
    },

    keepLastNItems: function(arr, n) {
        if (arr.length > n) {
            return arr.slice(arr.length - n, arr.length);
        } else {
            return arr;
        }
    },

    // remove duplicate elements in array
    uniqElementsArray: function(arr) {
        return Array.from(new Set(arr));
    },

    onlyNumbersAndLetters: function(str) {
        if (typeof str != 'string') {
            return str;
        }
        return str.replace(/[^a-zA-Z0-9]/g, '');
    },

    // chỉ cho phép chữ cái, số và dấu -, _
    codeStringInvalid(str) {
        return /[^a-zA-Z0-9_-]/.test(str);
    },

    onlyNumbers: function(str) {
        if (typeof str != 'string') {
            return str;
        }
        return str.replace(/[^0-9]/g, '');
    },

    // Tiếng Việt có dấu --> tiếng việt không dấu
    // VD: 'Phó đốc công phụ trách bộ phận gò' --> 'Pho doc cong phu trach bo phan go'
    tiengVietKhongDau(str) {
        return str
            .replace(/[ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ]/g, "A")
            .replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a")
            .replace(/[ÉÈẺẼẸÊẾỀỂỄỆ]/g, "E")
            .replace(/[éèẻẽẹêếềểễệ]/g, "e")
            .replace(/[ÍÌỈĨỊ]/g, "I")
            .replace(/[íìỉĩị]/g, "i")
            .replace(/[ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ]/g, "O")
            .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o")
            .replace(/[ÚÙỦŨỤƯỨỪỬỮỰ]/g, "U")
            .replace(/[úùủũụưứừửữự]/g, "u")
            .replace(/[ÝỲỶỸỴ]/g, "Y")
            .replace(/[ýỳỷỹỵ]/g, "y")
            .replace(/[Đ]/g, "D")
            .replace(/[đ]/g, "d")
            //.replace(/[^a-z0-9]/gi,''); // final clean up
    },

    // format số dạng 0001
    zeroLeading(num, len) {
        let s = num.toString();
        while (s.length < len) s = '0' + s;
        return s;
    },

    emailFromFullName(fullName, domain = 'xxx.com') {
        let arr = this.tiengVietKhongDau(fullName.trim()).toLowerCase().split(' ');
        let name = arr[arr.length - 1];
        for (let i = 0; i < arr.length - 1; i++) {
            name += arr[i].substring(0, 1);
        }
        return name + '@' + domain;
    },

    shortUserName(fullName, email) {
        let arr1 = fullName.split(' ');
        let name1 = arr1[arr1.length - 1];
        let arr2 = email.split('@');
        let name2 = arr2[0];
        let name3 = name2.substring(0, name1.length);
        let name4 = name2.substring(name1.length);
        name3 = name3.charAt(0).toUpperCase() + name3.slice(1);
        let name5 = name3 + name4.toUpperCase();
        //console.log('fullName: ' + fullName + ', email: ' + email + ' --> ' + name5);
        return name5;
    },

    // Tham khảo http://www.utf8-chartable.de/
    // https://stackoverflow.com/questions/21284228/removing-control-characters-in-utf-8-string
    removeAllControlCharacters: function(str) {
        if (typeof str != 'string') {
            return str;
        }
        return str.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    },

    escapeRegExp: function(strToEscape) {
        // Escape special characters for use in a regular expression
        return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    trimChar: function(origString, charToTrim) {
        charToTrim = this.escapeRegExp(charToTrim);
        var regEx = new RegExp("^[" + charToTrim + "]+|[" + charToTrim + "]+$", "g");
        return origString.replace(regEx, "");
    },

    adjustSpaces: function(str, relacement = ' ') {
        if (!str) {
            return null;
        }
        // return str.trim().replace(/\s\s+/g, ' ');
        return str.replace(/\s+/g, relacement);
    },

    removeAllSpaces(str) {
        return this.adjustSpaces(str, '');
    },

    // Dùng cho log
    limitStrLen(str, len) {
        if (str.length <= len || len <= 3) return str;
        return str.substring(0, len - 3) + '...';
    },

    getBearerTokenFromHeader: function(req) {
        if (!req.headers.authorization) {
            return { error: 'Missing access token' };
        }
        const BEARER = 'Bearer';
        var token = req.headers.authorization.trim();
        if (!token || token.length == 0) {
            return { error: 'Missing access token' };
        }
        var index = token.indexOf(BEARER);
        if (index == 0) {
            token = token.substring(BEARER.length, token.length);
        } else {
            return { error: 'Missing token type ' + BEARER };
        }
        return { token: token.trim() };
    },

    // mới chỉ test nhiều với thư viện request (các thư viện http khác ko chắc đúng)
    checkHttpResponse: function(err, res, body, expectedStatusCodes, actionName = null) {
        // Nếu có lỗi thì sẽ ko có response (VD ko connect đc, connect timeout...)
        if (err) {
            return { error: err };
        }

        // Nếu ko lỗi thì chắc chắn sẽ có response
        for (var i = 0; i < expectedStatusCodes.length; i++) {
            if (res.statusCode === expectedStatusCodes[i]) {
                if (this.isObject(body)) {
                    return { data: body };
                }
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    console.log('[utils/utils.js] checkHttpResponse error: ', e);
                    body = null;
                }
                return { data: body };
            } else {
                // statusCode ko mong muốn => lỗi, xử lý tiếp bên dưới
            }
        }

        if (this.isObject(body)) {
            return { error: body };
        }

        let errMsg = 'Response Code: ' + res.statusCode;
        let info;
        try {
            var bodyObj = JSON.parse(body);
            info = bodyObj.message ? bodyObj.message : body;
        } catch (e) {}

        if (actionName) {
            errMsg = actionName + ' failed. ' + errMsg;
        }
        if (info) {
            errMsg = errMsg + '. More detail: ' + info;
        }
        return { error: errMsg };
    },

    // Bind arguments starting after however many are passed in (from ES6)
    bind_trailing_args: function(fn, ...bound_args) {
        return function(...args) {
            return fn(...args, ...bound_args);
        };
    },

    // Bind arguments starting with argument number "n" (from ES6)
    bind_args_from_n: function(fn, n, ...bound_args) {
        return function(...args) {
            return fn(...args.slice(0, n - 1), ...bound_args);
        };
    },

    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    getRandomIntBetween(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },

    getRandomIntBetweenInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    },

    // ES5 version: construct arguments lists yourself
    // bind_trailing_args: function(fn) {
    //   var bound_args = [].slice.call(arguments, 1);
    //   return function() {
    //     var args = [].concat.call(arguments, bound_args);
    //     return fn.apply(this, args);
    //   };
    // }

    randomValueHex: function(len) {
        return crypto.randomBytes(Math.ceil(len / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, len); // return required number of characters
    },

    randomValueBase64: function(len) {
        return crypto.randomBytes(Math.ceil(len * 3 / 4))
            .toString('base64') // convert to base64 format
            .slice(0, len) // return required number of characters
            .replace(/\+/g, '0') // replace '+' with '0'
            .replace(/\//g, '0'); // replace '/' with '0'
    },

    hash: function(str) {
        if (typeof str !== 'string') {
            return 'input must be a string';
        }
        return crypto.createHmac('sha256', secret.hash_key).update(str).digest('hex');
    },

    encryptText(input, alg = 'aes-256-ctr', key = secret.secret_key) {
        var cipher = crypto.createCipher(alg, key);
        var crypted = cipher.update(input, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decryptText(input, alg = 'aes-256-ctr', key = secret.secret_key) {
        var decipher = crypto.createDecipher(alg, key);
        var dec = decipher.update(input, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    },

    paginationResult: function(skip, limit, list_data, total) {
        var ret = { total: total || list_data.length };
        ret.count = list_data.length;
        ret.skip = skip;
        ret.limit = limit;
        ret.list_data = list_data;
        return ret;
    },

    checkUserHasRole: function(user, role) {
        if (!user || !user.roles || !role) {
            return false;
        }
        if (role === 'DEFAULT') {
            return true;
        }
        for (let r of user.roles) {
            if (r.code === role) {
                return true;
            }
        }
        return false;
    },

    getExtensionFromFileName: function(fileName) {
        if (!fileName) {
            return '';
        }
        fileName = this.trimChar(fileName, '.');
        var arr = fileName.split('.');
        if (arr.length > 1) {
            return arr[arr.length - 1];
        }
        return '';
    },

    getUrlWithPort: function(url, port) {
        return Env.getUrlWithPort(url, port);
    },

    // Xóa file trong folder upload
    delFile(url) {
        if (!url || url.indexOf('http') == 0) return;
        let filePath = UPLOAD_DIR + url;
        fs.unlink(filePath, (err) => {
            if (err) console.error('[delFile] ' + url + ' --> error: ', err);
        });
    },

    getAssetStatusName(code) {
        let arr = config.AssetStatus.filter(it => it.code == code);
        if (arr.length > 0) return arr[0].name;
        return code;
    },

    cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    toBool(str) {
        if (str == true || str == 'true') return true;
        else if (str == false || str == 'false') return false;
        else return undefined;
    },

    isString(variable) {
        return typeof variable === 'string' || variable instanceof String;
    },

    isNumber(variable) {
        return typeof variable === 'number' || variable instanceof Number;
    },

    isBoolean(variable) {
        return typeof variable === 'boolean';
    },

    isArray(variable) {
        return Array.isArray(variable);
    },

    isFunction(variable) {
        return typeof variable === 'function';
    },

    isObject(variable) {
        return variable !== null && typeof variable === 'object';
    },

    isNull(variable) {
        return variable === null;
    },

    isUndefined(variable) {
        return variable === undefined;
    },

    objectHasProperty(obj, pro) {
        return Object.prototype.hasOwnProperty.call(obj, pro);
    },

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
};

const PLACEHOLDER = '%';

function replace(word = '', words = '') {
    let translation = word;
    const values = [].concat(words);
    values.forEach((e, i) => {
        translation = translation.replace(PLACEHOLDER.concat(i), e);
    });
    return translation;
}