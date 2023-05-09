const {signup,login, forgotPassword, resetPassword} = require('../Controller/authController');
const express = require('express');
const authRouter = express.Router();
authRouter.post("/signup" ,signup);
authRouter.post("/login",login);
authRouter.post("/forgotpassword",forgotPassword);
authRouter.post("/resetpassword",resetPassword);
module.exports = authRouter;