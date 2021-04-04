const mysql = require('mysql2')
const config = require('./config')

module.exports = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})