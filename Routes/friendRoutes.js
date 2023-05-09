const {protectedRoute} = require('../middleware/protectedRoute');
const {sendFriendReq,acceptFriendReq,rejectFriendReq,getallFriends, getallSentFriendRequest, getallRecievedFriendRequests, getAllSugestionFriend} = require('../Controller/friendController');
const express = require('express');
const friendRouter = express.Router();
friendRouter.post("/sendFriendReq",protectedRoute,sendFriendReq);
friendRouter.patch("/accept/:id",protectedRoute,acceptFriendReq);
friendRouter.delete("/reject/:id",protectedRoute,rejectFriendReq);
friendRouter.get('/allFriends',protectedRoute,getallFriends);
friendRouter.get('/getallRecievedFriendRequests',protectedRoute,getallRecievedFriendRequests);
friendRouter.get('/getallSentFriendRequest',protectedRoute,getallSentFriendRequest)
friendRouter.get('/getAllFriendSuggestion',protectedRoute,getAllSugestionFriend);
module.exports = friendRouter;