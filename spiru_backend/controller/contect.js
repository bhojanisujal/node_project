const { Content } = require("../model/contect");
const  Product  = require("../model/product");

// Create content
const createContent = async (req, res) => {
  try {
    const { productId, description, benefits, howtoUse, faqs, status } = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Associated product not found." });
    }

    const contentData = await Content.create({
      productId,
      description,
      benefits: benefits || [],
      howtoUse: howtoUse || [],
      faqs: faqs || [],
      status: status || "Draft"
    });

    return res.status(201).json({ success: true, data: contentData, message: "New content added successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all content
const getAllContent = async (req, res) => {
  try {
    const contentList = await Content.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
          pipeline: [
            {
              $project: {
                productName: 1,
                variants: 1,
                _id: 0
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$product.variants",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          productName: "$product.productName",
          productId: "$productId",
          productImage: "$product.variants.productImage",
          benefits: "$benefits",
          description: "$description",
          faqs: "$faqs",
          howtoUse: "$howtoUse"
        }
      }
    ]);

    return res.status(200).json({ success: true, data: contentList, message: "Content list retrieved successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single content by ID
const getContent = async (req, res) => {
  try {
    const contentItem = await Content.findById(req.params.id).populate('productId', 'name sku');

    if (!contentItem) {
      return res.status(404).json({ success: false, message: "Content not found." });
    }

    return res.status(200).json({ success: true, data: contentItem, message: "Content fetched successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const { productId, description, benefits, howtoUse, faqs, status } = req.body;

    if (productId) {
      const checkProduct = await Product.findById(productId);
      if (!checkProduct) {
        return res.status(404).json({ success: false, message: "Product ID is invalid or does not exist." });
      }
    }

    const updatedData = await Content.findByIdAndUpdate(
      req.params.id,
      {
        productId,
        description,
        benefits,
        howtoUse,
        faqs,
        status,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ success: false, message: "Content not found for update." });
    }

    return res.status(200).json({ success: true, data: updatedData, message: "Content updated successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Content not found for deletion." });
    }

    return res.status(200).json({ success: true, message: "Content removed successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContent,
  updateContent,
  deleteContent
};
