// https://github.com/kelektiv/node-cron
const CronJob = require('cron').CronJob;
const to = require('await-to-js').default;
const fs = require('fs');
const moment = require('moment');

const Env = require('../Utils/env');
const DBUtil = require('../Utils/db_utils');
const Entities = require('../Models/Entities');
const BaseCollection = require('../Models/BaseCollection');

const TimeZoneVN = 'Asia/Ho_Chi_Minh';
const TAG = '[cronjob/cron.js]';

module.exports = {
  async start() {
    // abc
    try {
      // Chạy hàng ngày xóa các file temporary
      job('0 0 23 * * *', removeTmpUpload);
      
    } catch (e) {
      console.log(TAG + ' error:', e);
    }
  },

  test() {
    // test
  }
}; // module.exports

function job(time, cb) {
  return new CronJob(time, () => cb(), null, true, TimeZoneVN);
}

function getBulkResultInfo(result) {
  return {
    ok: result.ok,
    nInserted: result.nInserted,
    nUpserted: result.nUpserted,
    nMatched: result.nMatched,
    nModified: result.nModified,
    nRemoved: result.nRemoved
  };
}

async function getCronHeader() {
  let dbUser = new BaseCollection(DBUtil.mongo, Entities.users);
  let err, cronUser;
  [err, cronUser] = await to(new Promise((resolve, reject) => {
    dbUser.collection.findOne({email: 'cronjob'}, (err, user) => {
      if (err) reject(err); else resolve(user);
    });
  }));
  if (err) return console.log(TAG + 'get cronUser error:', err);
  if (!cronUser) return console.log(TAG + 'cronUser does not exist');
  if (cronUser.login_sessions && cronUser.login_sessions.length > 0) {
    return {
      'authorization': 'Bearer ' + cronUser.login_sessions[0].token,
      'lang_code': 'vi',
      'authUser': cronUser
    };
  } else {
    return null;
  }
}

function removeTmpUpload() {
  // xóa hết nội dung trong temporary folder upload/thd/files/tmp
  let uploadDir = Env.BackendUploadBasedir + Env.BackendUploadFolder;
  let tmpDir = uploadDir + '/files/tmp';
  console.log('removeTmpUpload: ', tmpDir);
  rmDir(tmpDir);
}

rmDir = function(dirPath, removeSelf) {
  try {
    var files = fs.readdirSync(dirPath);
  } catch(e) { 
    return;
  }
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        rmDir(filePath, true);
      }
    }
  }
  if (removeSelf === true) {
    fs.rmdirSync(dirPath);
  }
};
