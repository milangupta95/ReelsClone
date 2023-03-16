const express = require('express');
const cookie = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookie());
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const friendRouter = require('./Routes/friendRoutes');
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/friend',friendRouter);

app.listen(8080,function() {
    console.log('Listening on port 8080');
});