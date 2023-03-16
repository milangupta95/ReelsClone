const mysql = require('mysql')
const {user,password} = require('../secrets');
let connection = mysql.createConnection({
    host: "db4free.net",
    user: user,
    password: password,
    database: "instagramreels",
})

connection.connect(function(err) {
    if (err) throw err
    console.log("Database Connected");
})

module.exports = connection;