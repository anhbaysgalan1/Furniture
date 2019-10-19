var path = require('path');
var fs = require('fs');
const awaitTo = require('await-to-js').default
const rootDir = process.cwd();
const fileInRoot = fs.readdirSync(rootDir);

Object.defineProperty(global, '__stack', {
  get: function () {
    let orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    let err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    let stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, 'use', {
  get: function () {
    //return require(pathFile)
    return (pathFile) => {
      const absoluteDir = path.dirname(__stack[1].getFileName());
      let error = null;
      //thử với require mặc định trong node_modules
      try {
        //thử với đường dẫn tương đối
        if (pathFile.substring(0, 1) == ".") {
          return require(`${absoluteDir}/${pathFile}`)
        }
        //thử với modules mở rộng
        const file = `${__dirname}/modules/${pathFile.split("/")[0]}.js`;
        if (fs.existsSync(file)) {
          let moduleExtend = require(file);
          if (moduleExtend && typeof moduleExtend === 'function') {
            return moduleExtend(pathFile)
          } else {
            return moduleExtend
          }
        }
        //thử với thư mục root
        if (fileInRoot.includes(pathFile.split("/")[0])) {
          return require(`${rootDir}/${pathFile}`)
        }
        //thử với node_modules
        return require(pathFile)
      } catch (e) {
        throw e
      }
    }
  }
});

Object.defineProperty(global, 'to', {
  get: function () {
    return (promise) => awaitTo(promise)
  }
});
