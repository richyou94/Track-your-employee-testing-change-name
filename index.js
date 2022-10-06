const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

