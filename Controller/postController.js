// get all the posts
const connection = require('../Model/db');
module.exports.getAllPost = function(req,res) {
    connection.query(`select fullName,email,profilepic,video_url from posts p inner join users
    u on u.id = p.user_id`,function(err,result) {
        if(err) {
            res.json({
                message: err.message
            })
        } else {
            if(result.length > 0) {
                res.json({
                    message: "Data Found SuccessFully",
                    ...result
                })
            } else {
                res.json({
                    message: "No Record Found"
                })
            }
        }
    })
};

// get post by id
module.exports.getOneUser = function(req,res) {
    const id = req.params.id;
    connection.query(`select fullName,email,profile_pic,video_url from posts p inner join users u
    on u.id = p.user_id where p.id = ?`,[id],function(err,result) {
        if(err) {
            res.json({
                message: "There Might be some Error while Getting Data"
            })
        } else {
            if(result.length > 0) {
                res.json({
                    message: "Data Fetched SuccessFully",
                    ...result[0]
                })
            } else {
                res.json({
                    message: "No Result Found"
                })
            }
        }
    })
};

// get our posts
module.exports.myposts = function(req,res) {
    const id = req.user.id;
    connection.query(`select fullName,email,profile_pic,video_url from posts p inner join users u
    on u.id = p.user_id where u.id = ?`,[id],function(err,result) {
        if(err) {
            res.json({
                message: "There might be some Error while fetching the data"
            })
        } else {
            if(result.length > 0) {
                res.json({
                    message : "Data Fetched SuccessFully",
                    ...result
                })
            } else {
                res.json({
                    message : "No Record Found"
                })
            }
        }
    })
};

// create a post
module.exports.createPost = function(req,res) {
    let {video_url} = req.body;
    let user_id = req.user.id;
    connection.query('insert into posts (video_url,user_id) values (?,?) ',[video_url,user_id],function(err,result) {
        if(err) {
            res.json({
                message: "there is some Error",
                success: 0
            })
        } else {
            res.json({
                message : "Post Created SuccessFully",
                success: 1,
            })
        }
    })
};

// ------------------------------------------ Likes ---------------------------------- //

// like a post
module.exports.dolike = function(req,res) {
    let id = req.params.id;
    let token = req.cookies.login;
    if(token) {
        const userId = token.id;
        connection.query("insert into likes (post_id,user_id) values(?,?)",[id,userId],function(err,res) {
            if(err) {
                res.json({
                    message: err.message
                })
            } else {
                res.json({
                    message: "You Liked the post",
                    ...result
                })
            }
        })
    } else {
        res.json({
            message: "You Must Login First"
        })
    }
};

// unlike a post
module.exports.dontlike = function(req,res) {
    let id = req.params.id;
    let token = req.cookies.login;
    if(token) {
        const userId = token.id;
        connection.query("delete from likes where post_id = ? and user_id = ?",[id,userId],function(err,res) {
            if(err) {
                res.json({
                    message: err.message
                })
            } else {
                res.json({
                    message: "You UnLiked the post",
                    ...result
                })
            }
        })
    } else {
        res.json({
            message: "You Must Login First"
        })
    }
};

// get all likes on a Post
module.exports.allLikes = function(req,res) {
    let id = req.params.id;
    let token = req.cookies.login;
    if(token) {
        const userId = token.id;
        connection.query("select user_id as id from likes where post_id = ?",[id],function(err,res) {
            if(err) {
                res.json({
                    message: err.message
                })
            } else {
                res.json({
                    message: "Data Fetched SuccessFull",
                    ...result
                })
            }
        })
    } else {
        res.json({
            message: "You Must Login First"
        })
    }
};

// count all likes 
module.exports.countLikes = function(req,res) {
    let id = req.params.id;
    let token = req.cookies.login;
    if(token) {
        const userId = token.id;
        connection.query("select count(user_id) as count from likes where post_id = ?",[id],function(err,res) {
            if(err) {
                res.json({
                    message: err.message
                })
            } else {
                res.json({
                    message: "Data Feteched SuccessFull",
                    ...result
                })
            }
        })
    } else {
        res.json({
            message: "You Must Login First"
        })
    }
};



// -------------------------------- Comments -------------------------------- //
// create a comment
module.exports.createComment = function(req,res) {
    let post_id = req.params.id;
    let user_id = req.user.id;
    let text = req.body.text;
    connection.query(`insert into comments (user_id,post_id,text) values(?,?,?)`,[post_id,user_id,text],function(err,res) {
        if(err) {
            res.json({
                message: "There Might be Some Server Error"
            })
        } else {
            res.json({
                message: "Comment Created SuccessFully"
            })
        }
    })
};

// delete a comment
module.exports.deleteComment = function(req,res) {
    let id = req.params.id;
    connection.query(`delete from comments where id = ?`,[id],function(err,res) {
        if(err) {
            res.json({
                message: "There Might be Some Server Error"
            })
        } else {
            res.json({
                message: "Comment Deleted SuccessFully"
            })
        }
    })
};

//update a comment
module.exports.updateComment = function(req,res) {
    let id = req.params.id;
    let text = req.body.text;
    connection.query(`update comments set text = ? where id = ?`,[text,id],function(err,res) {
        if(err) {
            res.json({
                message: "There Might be some Internal Server Error"
            })
        } else {
            res.json({
                message: "Comment Updated SuccessFully"
            })
        }
    })
};

//get all comments on a post
module.exports.getComments = function(req,res) {
    let post_id = req.params.id;
    connection.query(`select fullName,email,profile_pic,text from comments c inner join
    users u on u.user_id = c.user_id
    where post_id = ?`,[post_id],function(err,result) {
        if(err) {
            res.json({
                message: "There Might be Some Error while getting the data"
            })
        } else {
            if(result.length > 0) {
                res.json({
                    message: "Data Fetched SuccessFully",
                    ...result
                })
            } else {
                res.json({
                    message: "Sorry No Data Found"
                })
            }
        }
    })
};