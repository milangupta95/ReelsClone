module.exports.getProfile = function(req,res) {
    let user = req.user;
    if(user) {
        res.json({
            user
        })
    } else {
        res.json({
            message: "user Not Found"
        })
    }
}