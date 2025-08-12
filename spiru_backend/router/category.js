const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const cors = require('cors'); 
const { categorycreate, categoryupdate, categorygetall, categoryget, categorydelete } = require("../controller/category");


router.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    // console.log( `${Date.now()}${path.extname(file.originalname)} image log`  )

  }
});

const upload = multer({ storage: storage });

// Updated routes without multer on GET/DELETE requests
router.post("/create", upload.fields([
  { name: 'Categoryicone', maxCount: 1 }, 
  { name: 'Categoryimage', maxCount: 1 }
]), categorycreate);

router.post("/update/:_id", upload.fields([
  { name: 'Categoryicone', maxCount: 1 }, 
  { name: 'Categoryimage', maxCount: 1 }
]), categoryupdate);

// Removed multer from these routes:
router.get("/getall", categorygetall);
router.get("/get/:_id", categoryget);
router.delete("/delete/:_id", categorydelete);

module.exports = router;