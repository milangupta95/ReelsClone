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
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/friend', friendRouter);
app.use('/video',videoRouter);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    var filePath = "./client/build/index.html";
    var resolvedPath = path.resolve(filePath);
    res.sendFile(
        resolvedPath,
        function (err) {
            res.status(500).send(err);
        }
    );
});
app.listen(8080, function () {
    console.log('Listening on port 8080');
});