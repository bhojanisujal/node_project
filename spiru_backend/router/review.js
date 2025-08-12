const router = require("express").Router()

const { addReview, fetchReviews, fetchSingleReview, modifyReview, changeReviewStatus, removeReview } = require('../controller/review');

router.post('/create', addReview);
router.get('/getall', fetchReviews);
router.get('/get/:id', fetchSingleReview);
router.post('/update/:id', modifyReview);
router.post('/update-status/:id', changeReviewStatus);
router.delete('/delete/:id', removeReview);

module.exports = router;
