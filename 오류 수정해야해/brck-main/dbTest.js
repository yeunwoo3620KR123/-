// dbTest.js
const pool = require('./db');

pool.getConnection()
  .then(conn => {
    console.log("DB 연결 성공!");
    conn.release();
  })
  .catch(err => {
    console.error("DB 연결 실패:", err);
  });
