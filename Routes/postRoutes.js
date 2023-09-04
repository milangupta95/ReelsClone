const {protectedRoute} = require('../middleware/protectedRoute');
const {getAllPost,getOneUser,myposts,createPost,dolike,dontlike,allLikes,countLikes,createComment,deleteComment,updateComment,getComments} = require('../Controller/postController.js');

const express = require('express');
const postRouter = express.Router();
postRouter.get("/",protectedRoute,getAllPost);
postRouter.get("/:id",protectedRoute,getOneUser);
postRouter.get("/user/",protectedRoute,myposts);
postRouter.post("/",protectedRoute,createPost);
postRouter.post('/likes/:id',protectedRoute,dolike);
postRouter.delete('/likes/:id',protectedRoute,dontlike);
postRouter.get('/likes/:id',protectedRoute,allLikes);
postRouter.get('/likes/count/:id',protectedRoute,countLikes);
postRouter.post("/comments/:id",protectedRoute,createComment);
postRouter.delete("/comments/:id",protectedRoute,deleteComment);
postRouter.patch("/comments/:id",protectedRoute,updateComment);
postRouter.get("/comments/:id",protectedRoute,getComments);

module.exports = postRouter;
