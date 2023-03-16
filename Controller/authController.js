// signup
const connection = require('../Model/db');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
module.exports.signup = async(req,res) =>{
    let {fullName,email,password,profilepic} = req.body;
    password = await bcrypt.hash(password,10);
    connection.query("insert into users (fullName,email,password,profilepic) values(?,?,?,?)",
    [fullName,email,password,profilepic],function(err,result) {
        if(err) {
            res.json({
                message: err.message,
                success: 0,
            })
        } else {
            res.json({
                message: "Created User SuccessFully",
                result,
                success: 1
            })
        }
    });
};

//login
module.exports.login = function(req,res) {
    let {email,password} = req.body;
    connection.query("select * from users where email = ?",[email],async (err,result) => {
        if(err) {
            res.json({
                message: err.message,
                status:0
            })
        } else {
            if(result.length > 0) {
                const ans = await bcrypt.compare(password,result[0].password);
                if(ans) {
                    delete result[0].password;
                    const login = await jsonwebtoken.sign({...result[0]},"secret");
                    res.cookie('login',login);
                    res.json({
                        message: "User Loggedin Successfully",
                        ...result[0]
                    })
                } else {
                    res.json({
                        message: "Email and password does not match"
                    })
                }
            } else {
                res.json({
                    message: "User with this email is no found"
                })
            }
        }
    })
}