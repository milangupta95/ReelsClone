const {protectedRoute} = require('../middleware/protectedRoute');
const {sendFriendReq,acceptFriendReq,rejectFriendReq,getallFriends, getallSentFriendRequest, getallRecievedFriendRequests, getAllSugestionFriend} = require('../Controller/friendController');
const express = require('express');
const friendRouter = express.Router();
friendRouter.post("/",protectedRoute,sendFriendReq);
friendRouter.patch("/:id",protectedRoute,acceptFriendReq);
friendRouter.delete("/:id",protectedRoute,rejectFriendReq);
friendRouter.get('/',protectedRoute,getallFriends);
friendRouter.get('/recieved',protectedRoute,getallRecievedFriendRequests);
friendRouter.get('/sent',protectedRoute,getallSentFriendRequest)
friendRouter.get('/suggestions',protectedRoute,getAllSugestionFriend);
module.exports = friendRouter;