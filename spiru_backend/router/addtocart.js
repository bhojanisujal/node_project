const { addToCart, removeFromCart, updateCartQuantity, getCart } = require('../controller/addtocart')


const router = require('express').Router()

router.post('/add',addToCart)
router.get('/get/:userId',getCart)
router.post('/update-quantity',updateCartQuantity )
router.post('/remove',removeFromCart)

module.exports = router