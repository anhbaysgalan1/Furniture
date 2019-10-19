const Http = use("./http")
const Database = use("Database")
let bodyParser = require('body-parser');
const cors = use('cors')
const Router = use('Route')
class Server {
  static async start(){
    await Database.connect()
    Http.addHookBeforeStart(({app}) => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(cors())
      app.use(Router.build())
    })
    await Http.start()
  }
}

module.exports = Server
