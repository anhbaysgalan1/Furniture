const secret = require('../../config/secret.json');
const envJson = require('../../config/env.json');
const env = envJson.env;

module.exports = {
  Name: env,
  FrontendPort: envJson.frontend_port,
  FrontendHost: envJson.frontend_host,
  BackendPort: envJson.backend_port,
  BackendHost: envJson.backend_host,
  BackendUploadUrl: envJson.backend_url_upload,
  BackendUploadPort: envJson.backend_port_upload,
  BackendUploadBasedir: envJson.backend_upload_basedir,
  BackendUploadFolder: envJson.backend_upload_folder,
  DBMongoConnectionString: secret[env].db_connection_mongo,

  ProcedureAcceptLevel: {
    leader: 1,
    manager: 2,
    ceo: 3
  },

  AttType: {
    chamCong: 'work',    // chấm công
    chamCom: 'meal'      // chấm cơm
  },

  getUrlWithPort: function (url, port) {
    return (port == 80 || port == 443) ? url : url + ':' + port;
  },

  getBaseUrlUpload: function() {
    return this.getUrlWithPort(this.BackendUploadUrl, this.BackendUploadPort);
  },

  getBaseUrlFrontEnd: function () {
    return this.getUrlWithPort(this.FrontendHost, this.FrontendPort);
  }
};
