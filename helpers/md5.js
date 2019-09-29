const md5 = require("nodejs-md5");

module.exports = (str) => new Promise((resolve, reject) => md5.string.quiet(str, (e, md5str) => {
  if (e) {
    reject(e);
    return;
  }
  resolve(md5str);
}));
