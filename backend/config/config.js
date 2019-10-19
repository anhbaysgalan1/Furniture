const config = require('./config.json');
const envJson = require('./env.json');
config.dev.backend_host = envJson.backend_host || config.dev.backend_host;
config.pdfMakeFonts = require('../libs/pdfmake/fonts.json');
module.exports = config;
