const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cookieParser());
const fs = require('fs');
const connection = require('./Model/db');
let fileN = "";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "*"
}));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, fileN = Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage: storage })
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const friendRouter = require('./Routes/friendRoutes');
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/friend', friendRouter);
const protectedRoute = require('./middleware/protectedRoute').protectedRoute;

app.post('/videouplaod', protectedRoute, upload.single("video"), (req, res) => {
    try {
        const userId = req.user.id;
        const video_url = fileN;
        connection.query('insert into posts (video_url,user_id) values (?,?) ', [video_url, userId], function (err, result) {
            if (err) {
                res.status(501).json({
                    message: "there is some Error",
                    success: 0
                })
            } else {
                res.status(201).json({
                    message: "Post Created SuccessFully",
                    success: 1,
                })
            }
        })
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
})

app.get('/video/:filename', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(404).json({ message: "Video Not Found" });
    }
    const videoPath = `./uploads/${req.params.filename}`;
    const videoSize = fs.statSync(videoPath).size;
    const chunk_size = 3 * (10 ** 6);
    const start = (Number)(range.replace(/\D/g, ""));
    const end = Math.min(start + chunk_size, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start} - ${end} / ${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-length": contentLength,
        "Content-type": 'video/mp4'
    }
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(8080, function () {
    console.log('Listening on port 8080');
});