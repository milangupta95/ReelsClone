const { protectedRoute } = require('../middleware/protectedRoute');
const {getProfile, getAllUsers} = require('../Controller/userController');
const express = require('express');
const userRouter = express.Router();
userRouter.get("/profile",protectedRoute,getProfile);
userRouter.get("/getAllUser",getAllUsers);
module.exports = userRouter;