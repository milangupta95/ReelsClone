const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const multer = require("multer");
const app = express();
const stream = require('stream');
const path = require('path')
app.use(cookieParser());
const fs = require('fs');
const connection = require('./Model/db');
let laoding = true;
let fileN = "";
const oauth2client = require('./Utility/googleapi.jsx');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// }));
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, fileN = Date.now() + "-" + file.originalname);
//     }
// })

const upload = multer()
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const friendRouter = require('./Routes/friendRoutes');
const { google } = require('googleapis');
const { file } = require('googleapis/build/src/apis/file');
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/friend', friendRouter);
const protectedRoute = require('./middleware/protectedRoute').protectedRoute;

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    fileN = Date.now() + fileObject.originalname;
    let drive = new google.drive({
        version: 'v3',
        auth: oauth2client
    })
    const { data } = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileN,
            parents: ['1A7OmC8buPeT_kuDl3ne03nG5-mMqeZhA']
        }
    });
    if (data) {
        console.log(data);
        fileN = data.id;
    }
}
app.post('/videouplaod', protectedRoute, upload.single("video"), async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;
        uploadFile(file).then(() => {
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
        })
    } catch (err) {
        console.log(err.message);
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
    const videoPath = `https://drive.google.com/drive/folders/1A7OmC8buPeT_kuDl3ne03nG5-mMqeZhA?usp=sharing${req.params.filename}`;
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