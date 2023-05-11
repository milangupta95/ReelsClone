const mysql = require('mysql')
require('dotenv').config()
const user = process.env.user
const password = process.env.password
let connection = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: user,
    password: password,
    database: "sql12617589",
})

connection.connect(function(err) {
    if (err) throw err
    console.log("Database Connected");
})

module.exports = connection;