const {protectedRoute} = require('../middleware/protectedRoute');
const {sendFriendReq,acceptFriendReq,rejectFriendReq,getallFriends} = require('../Controller/friendController');
const express = require('express');
const friendRouter = express.Router();
friendRouter.post("/sendFriendReq",protectedRoute,sendFriendReq);
friendRouter.patch("/accept/:id",protectedRoute,acceptFriendReq);
friendRouter.delete("/reject/:id",protectedRoute,rejectFriendReq);
friendRouter.get('/allFriends/:id',protectedRoute,getallFriends);
module.exports = friendRouter;