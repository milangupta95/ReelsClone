// send friend request
const connection = require('../Model/db');
module.exports.sendFriendReq = function(req,res) {
    let senderId = req.user.id;
    let reciverId = req.body.id;
    connection.query(`insert into friend_requests (sender_id,reciever_id) values(?,?)`,[senderId,reciverId],function(err,result) {
        if(err){
            res.json({
                message: "There Might be Some Error while Sending Friend Request"
            })
        } else {
            res.json({
                message: "Friend Request Sent SuccessFully"
            })
        }
    })
};
// accept friend request
module.exports.acceptFriendReq = function(req,res) {
    const id = req.params.id;
    connection(`update friend_requests set status = 1 where id = ?`,[id],function(err,result) {
        if(err) {
            res.json({
                message : "There Might be Some Error"
            })
        } else {
            res.json({
                message: "Friend request accepted successFully"
            })
        }
    })
}
// reject friend request
module.exports.rejectFriendReq = function(req,res) {
    const id = req.params.id;
    connection.query(`delete from friend_requests where id = ?`,[id],function(err,result) {
        if(err) {
            res.json({
                message: "There Might be Some Error While Rejecting Friend Request"
            })
        } else {
            res.json({
                message : "The Friend Request has been deleted successFully"
            })
        }
    })
};
// get all friends
module.exports.getallFriends = function(req,res) {
    const user_id = req.params.id;
    connection.query(`select fullName,email,profile_pic from friend_requests fr 
    inner join user u on fr.reciever_id = u.id
    where sender_id = ? and status = 1`,[user_id],function(err,result) {
        if(err) {
            res.json({
                message : "There Might be Some Error"
            })
        } else {
            if(result.length > 0) {
                res.json({
                    message: "Data Fetched SucessFully",
                    ...result
                })
            } else {
                res.json({
                    message: "No Friends to show"
                })
            }
        }
    })
}