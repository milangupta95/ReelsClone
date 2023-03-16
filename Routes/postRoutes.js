const {protectedRoute} = require('../middleware/protectedRoute');
const {getAllPost,getOneUser,myposts,createPost,dolike,dontlike,allLikes,countLikes,createComment,deleteComment,updateComment,getComments} = require('../Controller/postController.js');

const express = require('express');
const postRouter = express.Router();
postRouter.get("/getAllPost",protectedRoute,getAllPost);
postRouter.get("/:id",protectedRoute,getOneUser);
postRouter.get("/myposts/",protectedRoute,myposts);
postRouter.post("/createPost/",protectedRoute,createPost);
postRouter.post('/likes/dolike/:id',protectedRoute,dolike);
postRouter.post('/likes/dontlike/:id',protectedRoute,dontlike);
postRouter.get('/likes/allLikes/:id',protectedRoute,allLikes);
postRouter.get('/likes/countLikes/:id',protectedRoute,countLikes);
postRouter.post("/comment/createComment/:id",protectedRoute,createComment);
postRouter.delete("/comment/deleteComment/:id",protectedRoute,deleteComment);
postRouter.patch("/comment/updateComment/:id",protectedRoute,updateComment);
postRouter.get("/comment/getComments/:id",protectedRoute,getComments);

module.exports = postRouter;
