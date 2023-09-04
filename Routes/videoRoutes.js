const multer = require("multer");
const upload = multer();
const express = require('express');
const {uploadVideo,retriveVideo} = require('../Controller/videoController');
const { protectedRoute } = require('../middleware/protectedRoute');
const videoRouter = express.Router();
videoRouter.post('/', protectedRoute, upload.single("video"),uploadVideo);
videoRouter.get('/:filename',protectedRoute,retriveVideo);
module.exports.videoRouter = videoRouter;