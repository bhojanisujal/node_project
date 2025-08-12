
const router = require('express').Router()
const path = require('path')
const multer = require('multer');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controller/product');

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/product')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}${getRandomChar()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({ storage: storage })

  
  router.post('/create',upload.any(), createProduct)
router.get('/get', getAllProducts)
router.get('/getbyId/:id',getProductById)
router.post('/update/:id',upload.any(),updateProduct)
router.delete('/delete/:id',deleteProduct)

module.exports = router