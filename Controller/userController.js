const connection = require("../Model/db");

module.exports.getProfile = function(req,res) {
    let user = req.user;
    if(user) {
        res.status(200).json({
            user
        })
    } else {
        res.status(400).json({
            message: "user Not Found"
        })
    }
}

module.exports.getAllUsers = function(req,res) {
    try {
        connection.query('select id,fullName,profilepic from users',[],(err,result) => {
            if(err) {
                res.status(500).json({
                    message: "There is Some Error while fetching Data"
                })
            } else {
                res.status(200).json({
                    message: "Users Fetched SuccessFully",
                    users: [...result]
                })
            }
        });
    } catch(err) {
        window.alert(err.message);
    }
}