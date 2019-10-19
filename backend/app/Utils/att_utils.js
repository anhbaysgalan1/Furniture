const request = require('request');
const Env = require('./env');
const Utils = require('./utils');
const HttpUtil = require('./http');
const Entities = require('../Models/Entities');
const DBUtil = require('./db_utils');
const BaseCollection = require('../Models/BaseCollection');

const TAG = '[att_utils]';

module.exports = {

  // Khai báo các action của server quản lý máy chấm công
  // POST http://192.168.6.75:81/api/att/{action}
  AttAction: {
    /**
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ],
        "fromTime": "2018-08-22 00:00:00",
        "toTime": "2018-08-23 00:00:00"
      }
     */
    getAttLogs: 'getAttLogs',

    /**
      POST params:
      {
        "machineIp": "192.168.6.10",
        "machinePort": 4370,
        "machineName": "May cham cong 1",
        "machineNumber": 1,
        "getFingerPrintData": true
      }
     */
    getAllUsers: 'getAllUsers',

    /**
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ]
      }
     */
    checkConnection: 'checkConnection',

    /**
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ],
        "userId": 20,
        "fullName": "Cao Mạnh Quang"
      }
     */
    newUser: 'newUser',

    /**
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ],
        "users": [1, 2, 3]
      }
     */
    delUsers: 'delUsers',

    /**
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ],
        "userId": 20
      }
     */
    delUser: 'delUser',

    /**
      Import list users from database into all att machines
      POST params:
      {
        "attMachines": [
          {
            "machineIp": "192.168.6.10",
            "machinePort": 4370,
            "machineName": "May cham cong 1",
            "machineNumber": 1
          }
        ],
        "users": [
          { "code": 1, "name": "Nguyen Van A" },
          { "code": 2, "name": "Nguyen Van B" }
        ]
      }
     */
    syncUsersFromDB: 'syncUsersFromDB',

    /**
      Copy tất cả dữ liệu user (tên, ID và dữ liệu vân tay) từ 1 máy sang 1 máy khác
      POST params:
      {
        "from": {
          "machineIp": "192.168.6.10",
          "machinePort": 4370,
          "machineName": "May cham cong 1",
          "machineNumber": 1
        },
        "to": {
          "machineIp": "192.168.6.11",
          "machinePort": 4370,
          "machineName": "May cham cong 2",
          "machineNumber": 2
        },
      }
     */
    syncUserData: 'syncUserData',

    getFPData: 'getFPData'
  },


  // includeAllAtts = true: tự động lấy tất cả máy chấm công trong DB và thêm vào mảng 'attMachines'
  sendAttApi(action, params, headers, includeAllAtts = false) {
    let self = this;
    if (!params) params = {};
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          if (includeAllAtts == true) {
            // Lấy danh sách các máy chấm công
            let atts = await self.getAllAtts();
            if (!atts || atts.length == 0) {
              return reject({code: HttpUtil.NOT_FOUND, message: 'Chưa có máy chấm công nào được khai báo trong cơ sở dữ liệu.'});
            }
            if (!params.attMachines) {
              params.attMachines = atts;
            };
          }
          // Gửi request đến server quản lý máy chấm công
          let req = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': headers.authorization,
              'lang_code': headers.lang_code
            },
            timeout: 60000,
            url: Env.AttApiUrl + '/' + action,
            json: params,
            method: 'POST'
          };
          let result = await sendReq(req);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      })();
    });
  },

  getAllAtts() {
    let dbAtt = new BaseCollection(DBUtil.mongo, Entities.att_machines);
    let collection = dbAtt.collection;
    return new Promise((resolve, reject) => {
      let query = DBUtil.adjustQuery_ExcludeSoftDelete({});
      collection.find(query, {insert: 0, update: 0, delete: 0}).toArray((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getPrimaryAtt() {
    let dbAtt = new BaseCollection(DBUtil.mongo, Entities.att_machines);
    let collection = dbAtt.collection;
    return new Promise((resolve, reject) => {
      let query = DBUtil.adjustQuery_ExcludeSoftDelete({isPrimary: true});
      collection.findOne(query, {insert: 0, update: 0, delete: 0}, (err, result) => {
        if (err) reject(err); else resolve(result);
      });
    });
  },

  // In ra các thông tin của 1 máy chấm công (ip, port, number, name)
  attDescription(att) {
    return '[' + att.machineIp + ':' + att.machinePort + ' (' + att.machineNumber + ') ' + att.machineName + ']';
  }

};

function sendReq(req) {
  return new Promise((resolve, reject) => {
    let strLogParam = Utils.limitStrLen(JSON.stringify(req.json), 2500);
    console.log(TAG + ' ' + req.method + ': ' + req.url + '\n   headers: ' + JSON.stringify(req.headers) + '\n   params: ' + strLogParam + '\n');
    request(req, (err, res, body) => {
      if (err) {
        console.log('   -> ' + TAG + ' ' + req.method + ': ' + req.url + ' --> error:\n', err, ' -- body: ', body, '\n');
      } else {
        console.log('   -> ' + TAG + ' ' + req.method + ': ' + req.url + ' --> succcess\n');
      }
      let result = Utils.checkHttpResponse(err, res, body, [HttpUtil.OK, HttpUtil.CREATED]);
      if (result.error) reject(result.error); else resolve(result.data);
    });
  });
}
