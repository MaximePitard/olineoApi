const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
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