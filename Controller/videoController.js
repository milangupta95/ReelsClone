const AWS = require("aws-sdk");
const connection = require('../Model/db');
const s3 = new AWS.S3();
module.exports.uploadVideo = async function (req, res) {
    try {
        console.log("Called for Video Upload");
        const userId = req.user.id;
        const file = req.file;
        const fileContent = file.buffer;
        // Setting up S3 upload parameters
        const params = {
            Bucket: "cyclic-fine-pear-anemone-suit-ap-northeast-1",
            Key: Date.now() + file.originalname, // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log("Video Added SuccessFully");
            const video_url = data.Key;
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
        });
    } catch (err) {
        console.log(err.message);
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.retriveVideo = function(req,res) {
    const fileName = req.params.filename;
    console.log(fileName);
    const options = {
        Bucket: "cyclic-fine-pear-anemone-suit-ap-northeast-1",
        Key: fileName
    };
    // Create new read steam from s3 getObject
    const s3FileReadStream = s3.getObject(options).createReadStream();
    // pipe the s3 read stream directly to express response objec (which is also a stream).
    s3FileReadStream.pipe(res);
}