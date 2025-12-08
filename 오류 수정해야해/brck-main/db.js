const mariadb = require('mariadb')
require('dotenv').config();

const pool = mariadb.createPool({
     host: process.env.DB_HOST,//'localhost',
    port: 3306,
    user:  process.env.DB_USER, //'root',
    password:  process.env.DB_PASS, //'root',
    database:  process.env.DB_NAME //'sample'

})

module.exports = pool;