const mysql = require('mysql')
require('dotenv').config()
const user = process.env.user
const password = process.env.password
let connection = mysql.createConnection({
    host: "db4free.net",
    user: user,
    password: password,
    database: "instagramreels",
    port : 3306
})

connection.connect(function(err) {
    if (err) throw err
    console.log("Database Connected");
})

module.exports = connection;