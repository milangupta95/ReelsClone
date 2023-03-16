const { protectedRoute } = require('../middleware/protectedRoute');
const {getProfile} = require('../Controller/userController');
const express = require('express');
const userRouter = express.Router();
userRouter.get("/profile",protectedRoute,getProfile);
module.exports = userRouter;