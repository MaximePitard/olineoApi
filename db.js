const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 1,
  supportBigNumbers: true
})

//query
function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        return reject(err);
      }
      connection.query(sql, function(err, result) {
        connection.release();
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
}
module.exports = {query}