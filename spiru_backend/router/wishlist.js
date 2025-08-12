// const { addwishlist, removewishlist, getwishlist } = require('../controllers/whishlist')

const { addwishlist, removewishlist, getwishlist } = require('../controller/whishlist')

const router = require('express').Router()

router.post('/add',addwishlist)
router.post('/remove',removewishlist)
router.get('/get/:userId',getwishlist)

module.exports = router