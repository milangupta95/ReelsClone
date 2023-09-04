const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const friendRouter = require('./Routes/friendRoutes');
const { videoRouter } = require('./Routes/videoRoutes');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/friends', friendRouter);
app.use('/api/v1/video',videoRouter);
app.listen(8080, function () {
    console.log('Listening on port 8080');
});