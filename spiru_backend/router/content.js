const { createContent, getAllContent, getContent, updateContent, deleteContent } = require('../controller/contect')

const router = require('express').Router()

router.post('/create',createContent)
router.get('/getall',getAllContent)
router.get('/get/:id',getContent)
router.post('/update/:id',updateContent )
router.delete('/delete/:id',deleteContent)

module.exports = router