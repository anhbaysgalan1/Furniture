let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const config = use('config/http')

class Http {
  static getServer() {
    return app
  }
  static listen(port, host) {
    this.host = host
    this.port = port
    return this
  }
  static use(middleware) {
    app.use(middleware)
  }
  static addHookBeforeStart(func) {
    if (!this.hooksBeforeStart) this.hooksBeforeStart = []
    this.hooksBeforeStart.push(func)
  }
  static async start() {
    this.hooksBeforeStart.map(hook => {
      hook({ app })
    })
  
    app.listen(this.port, this.host, () => {
      console.log(`server stated: ${this.host}:${this.port}`)
      if (typeof callback == "function") {
        return app
      }
    })
  }
}

Http.host = config.HOST
Http.port = config.PORT
module.exports = Http
