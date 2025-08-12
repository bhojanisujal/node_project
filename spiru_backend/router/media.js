const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    uploadMediaFiles,
    fetchAllMedia,
    fetchSingleMedia,
    removeMediaById,
    filterMediaByCategory
} = require('../controller/media');

const router = express.Router();



const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '../media');

    // ✅ Create folder if not exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});


const uploader = multer({
    storage: storageEngine,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


router.post('/create', (req, res, next) => {
    uploader.any()(req, res, (err) => {
        if (err) {
            console.log("UPLOAD ERROR:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

        console.log("Received files:", req.files.map(f => f.fieldname));
        next();
    });
}, uploadMediaFiles);




router.get('/get', fetchAllMedia);
router.get('/item/:id', fetchSingleMedia);
router.get('/category/:category', filterMediaByCategory);
router.delete('/remove/:id', removeMediaById);

module.exports = router;
