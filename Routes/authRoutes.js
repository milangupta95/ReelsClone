const {signup,login} = require('../Controller/authController');
const express = require('express');
const authRouter = express.Router();
authRouter.post("/signup",signup);
authRouter.post("/login",login);
module.exports = authRouter;