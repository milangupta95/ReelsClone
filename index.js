const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path')
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
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