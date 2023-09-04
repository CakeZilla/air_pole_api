const mysql = require('mysql');
require('dotenv').config();

// NOTE: create start mysql connection
const connection = mysql.createPool({
  host: process.env.HOST, //mysql database host name
  port: process.env.PORT, //mysql database user port
  user: process.env.USERNAME, //mysql database user name
  password: process.env.PASSWORD, //mysql database password
  database: process.env.DATABASE, //mysql database name
});

module.exports = {
  connection,
};
