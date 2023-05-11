// signup
const connection = require('../Model/db');
const jsonwebtoken = require('jsonwebtoken');
const mailSender = require('../Utility/MailSender');

module.exports.signup = async (req, res) => {
    try {
        let { fullName, email, password, profilepic } = req.body;
        // password = await bcrypt.hash(password, 10);
        connection.query("insert into users (fullName,email,password,profilepic) values(?,?,?,?)",
            [fullName, email, password, profilepic], function (err, result) {
                if (err) {
                    console.log(err.message);
                    res.status(401).json({
                        message: err.message,
                        success: 0,
                    })
                } else {
                    res.status(201).json({
                        message: "Created User SuccessFully",
                        result,
                        success: 1
                    })
                }
            });
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
};

//login
module.exports.login = function (req, res) {
    try {
        let { email, password } = req.body;
        connection.query("select * from users where email = ?", [email], async (err, result) => {
            if (err) {
                res.json({
                    message: err.message,
                    status: 0
                })
            } else {
                if (result.length > 0) {
                    // const ans = await bcrypt.compare(password, result[0].password);
                    if (password === result[0].password) {
                        delete result[0].password;
                        const login = jsonwebtoken.sign({ ...result[0] }, "secret");
                        res.cookie('login', login);
                        res.status(201).json({
                            message: "User Loggedin Successfully",
                            user: { ...result[0] }
                        })
                    } else {
                        res.status(401).json({
                            message: "Email and password does not match"
                        })
                    }
                } else {
                    res.status(401).json({
                        message: "User with this email is no found"
                    })
                }
            }
        })
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}

//forgotPassword
module.exports.forgotPassword = function (req, res) {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        connection.query("select email from users where email = ?", [email], (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({
                    message: "Unable to find email"
                })
            } else {
                if (result.length == 0) {
                    res.status(400).json({
                        message: "This Email is Not Associated With Us"
                    })
                } else {
                    connection.query("delete from forgotpassword where email = ?",[email],(err,result3) => {
                        if(err) {
                            res.status(500).json({
                                message : "There is Some Error"
                            })
                        } else {
                            mailSender(email,otp);
                            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
                            connection.query("insert into forgotpassword(email,otp,otpExpiry) values(?,?,?)", [email, otp,otpExpiry], (err, result2) => {
                                if (err) {
                                    console.log(err.message);
                                    res.status(500).json({
                                        message: "Error While Sending"
                                    });
                                } else {
                                    res.status(200).json({
                                        message: "Otp sent successfully"
                                    })
                                }
                            })
                        }
                    })
                    
                }
            }
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            message: "Unable to Send Otp"
        })
    }
}

module.exports.resetPassword = async function(req,res) {
    try {
        let {email,otp,password} = req.body;
        // hashedpassword = await bcrypt.hash(password, 10);
        otp = (String)(otp);
        connection.query("select email from forgotpassword where email = ? and otp = ?",[email,otp],(err,result) => {
            if(err) {
                res.status(500).json({
                    message : "Internal Error"
                })
            } else {
                if(result.length == 0) {
                    res.status(400).json({
                        message: "Wrong otp"
                    })
                } else {
                    connection.query("delete from forgotpassword where email = ?",[email],(err,result2) => {
                        if(err) {
                            res.status(500).json({
                                message : "Unable to Reset your password"
                            })
                        } else {
                            connection.query("update users set password = ? where email = ?",[password,email],(err,result) => {
                                if(err) {
                                    res.status(500).json({
                                        message : "Unable To update password"
                                    })
                                } else {
                                    res.status(200).json({
                                        message : "Password Reset SuccessFull Please login"
                                    })
                                }
                            })
                        }
                    })
                    
                }
            }
        })
    } catch(err) {
        res.status(500).json({
            message: "Internal Error"
        })
    }
}