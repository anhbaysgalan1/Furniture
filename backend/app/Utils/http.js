const Utils = require('./utils');
const Config = require('../../config/config.json');
const Lang = require('../../lang/lang_backend.json');
const DefaultLangCode = Config.default_language;

module.exports = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,

  getParams: function (req) {
    var p = {};
    Object.assign(p, req.query);  // try to get from url query string
    Object.assign(p, req.body);   // try to get from json
    return p;
  },

  getParamsFull: function (req) {
    var p = {};
    Object.assign(p, req.query);    // url query string, e.g api/users?param1=x&param2=y
    Object.assign(p, req.body);     // json parameters
    Object.assign(p, req.params);   // url parameters, e.g api/users/:id
    //p.authUser = req.authUser;
    return p;
  },

  getHeaderParams: function (req) {
    return {
      role_code: req.headers.role_code,
      lang_code: req.headers.role_code
    }
  },

  getRequiredParamsFromJson: function (req, required_param_names) {
    return Utils.checkRequiredParams(req.body, required_param_names);
  },

  getRequiredParamsFromJson2: function (req, required_param_names) {
    return Utils.checkRequiredParams2(req.body, required_param_names);
  },

  getRequiredParamsFromUrl: function (req, required_param_names) {
    return Utils.checkRequiredParams(req.query, required_param_names);
  },

  getRequiredParams: function (req, required_param_names) {
    const params = this.getParams(req);
    return Utils.checkRequiredParams(params, required_param_names);
  },

  getRequiredParams2: function (req, required_param_names) {
    const params = this.getParams(req);
    return Utils.checkRequiredParams2(params, required_param_names);
  },

  createErrorInvalidInput: function (msgOrKey, words) {
    return this.createError(this.BAD_REQUEST, msgOrKey, words);
  },

  createError: function (code, msgOrKey, words) {
    let err = {
      code: code
    };
    if (Lang[msgOrKey]) {
      // đây là key --> tìm nội dung message tương ứng theo key
      err.msgKey = msgOrKey;
      err.words = words;
    } else {
      err.message = msgOrKey;
    }
    return err;
  },

  // gọi từ api interface, thường dùng khi input validator failed
  // err được tạo từ api/controller, dùng hàm createErrorInvalidInput bên trên
  apiError: function (langCode, res, err) {
    // console.log('apiError langCode: ', langCode, ' -- err: ', err);
    if (err instanceof Error) {
      this.internalServerError(res, err);
    } else {
      let result = {};
      const httpCode = (err && err.code) ? err.code : this.BAD_REQUEST;
      if (err && err.msgKey) {
        result = Utils.getMsgObjectFromKey(langCode, err.msgKey, err.words);
      } else if (Utils.isString(err)) {
        // err là messageKey
        result = Utils.getMsgObjectFromKey(langCode, err);
      } else if (Utils.isArray(err) && err.length > 0 && Utils.isString(err[0])) {
        // err là mảng [messageKey, args]
        let key = err.shift();  // lấy thằng đầu tiên là key, đoạn còn lại của mảng sẽ là các arguments để format
        result = Utils.getMsgObjectFromKey(langCode, key, err);
      } else {
        result = err;
      }
      this.error(httpCode, res, result);
    }
  },

  // dùng hàm này trong trường hợp 'Message_Code' có dạng 'xxx %0 yyy %1 zzz'
  // và truyền thêm 1 mảng các word thay thế cho %0, %1
  error1: function (httpCode, req, res, err_msg_key, words) {
    const msg = Utils.getMsgObjectFromKey(req, err_msg_key, words);
    this.error(httpCode, res, msg);
  },

  // các trường hợp sử dụng thường gặp
  // error(500, res, err)
  // error(500, [req, res], 'Message_Code')
  error: function (httpCode, res, err, opt_info = null) {
    _error(httpCode, res, err, opt_info);
  },

  unauthorized: function (res, err, opt_info = null) {
    if (!err) err = "Unauthorized";
    this.error(this.UNAUTHORIZED, res, err, opt_info);
  },

  forbidden: function (res, err, opt_info = null) {
    if (!err) err = "Forbidden";
    this.error(this.FORBIDDEN, res, err, opt_info);
  },

  badRequest: function (res, err, opt_info = null) {
    if (!err) err = "Bad request";
    this.error(this.BAD_REQUEST, res, err, opt_info);
  },

  notFound: function (res, err, opt_info = null) {
    if (!err) err = "Not found";
    this.error(this.NOT_FOUND, res, err, opt_info);
  },

  internalServerError: function (res, err, opt_info = null) {
    if (!err) err = "Internal server error";
    this.error(this.INTERNAL_SERVER_ERROR, res, err, opt_info);
  },

  successForward: function(res, data = null) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(this.OK);
    res.json(data);
  },

  success: function (res, data = null, httpCode = this.OK) {
    var ret = {message: "Success"};
    if (data) {
      if (data.ui_message) {
        ret.ui_message = data.ui_message;
        delete data.ui_message;
      }
      if (data.message) {
        ret.message = data.message;
        delete data.message;
      }
      if (data.constructor == Array) {
        ret.count = data.length;
      } else if (typeof data === "object" && Object.keys(data).length == 0) {
        data = undefined;
      }
      ret.data = data;
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.status(httpCode);
    res.json(ret);
  },

  created: function (res, data = null) {
    this.success(res, data, this.CREATED);
  },

  requireRole(req, requiredRole) {
    const user = req.authUser;
    const currentUserRole = req.headers.role_code;
    if (!currentUserRole || requiredRole != currentUserRole) {
      return false;
    }
    return Utils.checkUserHasRole(user, currentUserRole);
  },

  // forwardResult = true: dùng tham số này trong trường hợp action là các restful api request khác, lúc đó chỉ cần forward nguyên kết quả thôi
  handle(action, req, res, forwardResult = false) {
    action.then(result => {
      //console.error(req.url + ' --> result: ', result);
      if (forwardResult) {
        this.successForward(res, result);
      } else {
        this.success(res, result);
      }
    }).catch(err => {
      console.error('[' + req.method + '] ' + Utils.getFullUrlFromRequest(req) + ' --> error: ', err);
      this.apiError(req.headers.lang_code, res, err);
    });
  },

  params(req) {
    var p = {};
    Object.assign(p, req.query); // try to get from url query string
    Object.assign(p, req.body); // try to get from json
    return p;
  },

  headers(req) {
    return {
      authUser: req.authUser,
      lang_code: req.headers.lang_code,
      role_code: req.headers.role_code,
      userAgent: req.headers['user-agent'],
      authorization: req.headers.authorization,
      other: req.headers
    }
  },

  // params from url get /api/users?sort=email,1
  // return {email: 1}
  parseSort(paramSort, defaultSort = {'insert.when': -1}) {
    var sort;
    if (paramSort) {
      var arr = paramSort.split(',');
      if (arr.length == 2) {
        var sortName = arr[0].trim();
        var sortValue = Number(arr[1]);
        if ((sortValue === 1 || sortValue === -1) && sortName.length > 0) {
          sort = { [sortName]: sortValue };
        }
      }
    }
    return sort || defaultSort;
  },

  notImplement() {
    return Promise.reject({ code: this.INTERNAL_SERVER_ERROR, message: 'Function has not implemented yet' });
  },
  
  disableApi(msg) {
    msg = msg || 'API was already disabled';
    return Promise.reject({ui_message: msg });
  },

  ddd: function (input) {
    return Promise.resolve(input);
  }
};

// res could be one of these type
// - original response object
// - array of original request, response objects [req, res]
// err could be one of these type
// - instance of Error
// - string
// - key of localization string
function _error(httpCode, res, err, opt_info = null) {
  let data = {};
  if (Array.isArray(res)) {
    const req = res[0];
    res = res[1];
    const langCode = req.headers.lang_code || Config.default_language;
    if (typeof err === 'string' || err instanceof String) {
      const key = err;
      if (Lang[key]) {
        data.message = Lang[key]['message'] || key;
        data.ui_message = Lang[key][langCode] || Lang[key][DefaultLangCode] || key;
      }
    }
  }

  if (err && err.ui_message) {
    data.ui_message = err.ui_message;
  }

  if (err && err.message_key) {
    data.message_key = err.message_key;
  }

  if (!data.message) {
    data.message = Utils.getErrorString(err);
  }

  if (err && err.need_user_confirm) {
    data.need_user_confirm = err.need_user_confirm;
  }

  if (opt_info) {
    data.extra_info = opt_info;
  }
  res.status(httpCode).send(data);
}
