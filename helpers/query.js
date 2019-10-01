module.exports = async (conn, q, params) => new Promise(
(resolve, reject) => {
  const handler = (error, result) => {
	  if (error) {
      reject(error);
      return;
    }
    resolve(result);
  }
  conn.query(q, params, handler);
}).catch(console.log);
