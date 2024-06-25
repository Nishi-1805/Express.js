const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
user: 'root',
database: 'node-connect',
password: 'Rajran@21210703'
});

module.exports = pool.promise();