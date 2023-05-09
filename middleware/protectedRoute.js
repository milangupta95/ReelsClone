const jwt = require('jsonwebtoken');

module.exports.protectedRoute = (req,res,next) => {
    let login = req.cookies.login;
    if(login) {
        let verify = jwt.verify(login,"secret");
        if(verify) {
            req.user = verify;
            next();
        } else {
            res.json({
                message: "User Not Verified"
            })
        }
    } else {
        res.json({
            message: "User Not Logged in"
        })
    }
}