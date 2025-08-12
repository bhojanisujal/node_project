const ReviewModel = require('../model/review');


const addReview = async (req, res) => {
  try {
    const {
      product,
      user,
      count,
      title,
      content,
      displayName,
      email,
    } = req.body;

    const reviewEntry = await ReviewModel.create({
      product,
      user,
      count,
      title,
      content,
      displayName,
      email,
    });

    res.status(201).json({ success: true, review: reviewEntry, message: "Review submitted successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


const fetchReviews = async (req, res) => {
  try {
    const { status, isApprove, product } = req.query;

    const queryFilter = {};
    if (status) queryFilter.status = status;
    if (isApprove !== undefined) queryFilter.isApprove = isApprove === 'true';
    if (product) queryFilter.product = product;

    const reviewList = await ReviewModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
          pipeline: [
            {
              $project: {
                productName: 1,
                _id: 0
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                name: 1,
                _id: 0
              }
            }
          ]
        }
      },
      { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          productName: "$product.productName",
          user: "$user.name",
          count: "$count",
          title: "$title",
          content: "$content",
          displayName: "$displayName",
          email: "$email",
          isApprove: "$isApprove",
          status: "$status",
          createdAt: "$createdAt"
        }
      }
    ]);

    res.status(200).json({ success: true, data: reviewList, message: "Reviews retrieved successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const fetchSingleReview = async (req, res) => {
  try {
    const reviewDoc = await ReviewModel.findById(req.params.id)
      .populate('product', 'productName')
      .populate('user', 'name');

    if (!reviewDoc) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    res.status(200).json({ success: true, data: reviewDoc, message: "Review details fetched." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const modifyReview = async (req, res) => {
  try {
    const editedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!editedReview) {
      return res.status(404).json({ success: false, message: "Review does not exist." });
    }

    res.status(200).json({ success: true, review: editedReview });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


const changeReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: "Status value is not allowed." });
    }

    const result = await ReviewModel.updateOne(
      { _id: req.params.id },
      { $set: { status, isApprove: status === 'Approved' } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "No changes made or review not found." });
    }

    res.status(200).json({ success: true, message: "Review status successfully updated." });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Remove a review
const removeReview = async (req, res) => {
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ success: false, message: "No review found to delete." });
    }

    res.status(200).json({ success: true, message: "Review removed from system." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addReview,
  removeReview,
  changeReviewStatus,
  modifyReview,
  fetchSingleReview,
  fetchReviews,
};
