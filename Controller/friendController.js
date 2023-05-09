// send friend request
const connection = require('../Model/db');
module.exports.sendFriendReq = function (req, res) {
    let senderId = req.user.id;
    let reciverId = req.body.id;
    console.log(senderId + " " + reciverId);
    connection.query(`insert into friend_requests (sender_id,reciever_id) values(?,?)`, [senderId, reciverId], function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).json({
                message: "There Might be Some Error while Sending Friend Request"
            })
        } else {
            res.status(200).json({
                message: "Friend Request Sent SuccessFully"
            })
        }
    })
};
// accept friend request
module.exports.acceptFriendReq = function (req, res) {
    const id = req.params.id;
    connection.query(`update friend_requests set status = 1 where id = ?`, [id], function (err, result) {
        if (err) {
            res.json({
                message: "There Might be Some Error"
            })
        } else {
            res.json({
                message: "Friend request accepted successFully"
            })
        }
    })
}
// reject friend request
module.exports.rejectFriendReq = function (req, res) {
    const id = req.params.id;
    connection.query(`delete from friend_requests where id = ?`, [id], function (err, result) {
        if (err) {
            res.json({
                message: "There Might be Some Error While Rejecting Friend Request"
            })
        } else {
            res.json({
                message: "The Friend Request has been deleted successFully"
            })
        }
    })
};
// get all friends
module.exports.getallFriends = function (req, res) {
    const user_id = req.user.id;
    connection.query(`select fullName,email,profilepic from friend_requests fr 
    ,users u where (fr.reciever_id = u.id and sender_id = ?) or (fr.reciever_id = ? and sender_id = u.id) and status = 1`, [user_id, user_id], function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).json({
                message: "There Might be Some Error"
            })
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Data Fetched SucessFully",
                    friends: [...result]
                })
            } else {
                res.status(200).json({
                    message: "No Friends to show",
                    friends: []
                })
            }
        }
    })
}
// get all pending friend requests
module.exports.getallRecievedFriendRequests = function (req, res) {
    const user_id = req.user.id;
    connection.query(`select fr.id as id,fullName,email,profilepic from friend_requests fr 
    inner join users u on fr.sender_id = u.id
    where reciever_id = ? and status = 0`, [user_id], function (err, result) {
        if (err) {
            res.status(500).json({
                message: "There Might be Some Error"
            })
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Data Fetched SucessFully",
                    users: [...result]
                })
            } else {
                res.status(200).json({
                    message: "No Friends to show",
                    users: []
                })
            }
        }
    })
}
// get all sent friend requests  
module.exports.getallSentFriendRequest = function (req, res) {
    try {
        const user_id = req.user.id;
        connection.query(`select fullName,email,profilepic from friend_requests fr 
        inner join users u on fr.reciever_id = u.id
        where sender_id = ? and status = 0`, [user_id], function (err, result) {
            if (err) {
                res.status(500).json({
                    message: "There Might be Some Error"
                })
            } else {
                if (result.length > 0) {
                    res.status(200).json({
                        message: "Data Fetched SucessFully",
                        users: [...result]
                    })
                } else {
                    res.status(200).json({
                        message: "No Friends to show",
                        users: []
                    })
                }
            }
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
//get all suggestion friend
module.exports.getAllSugestionFriend = function (req, res) {
    try {
        const user_id = req.user.id;
        connection.query(`select id,fullName,email,profilepic
        from users where id not in (select sender_id from
            friend_requests where reciever_id = ? or sender_id = ?) and
            id not in (select reciever_id from
                friend_requests where reciever_id = ? or sender_id = ?) and
            id != ?`, [user_id, user_id, user_id, user_id, user_id], (err, result) => {
            if (err) {
                console.log(err.message)
                res.status(500).json({
                    message: err.message
                })
            } else {
                res.status(200).json({
                    users: [...result]
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}