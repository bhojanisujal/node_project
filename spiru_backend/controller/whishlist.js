const whishlist = require("../model/wishlist");


const addwishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await whishlist.updateOne(
      { user: userId },
      { $addToSet: { products: productId } }, 
      { upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the product to wishlist.",
    });
  }
};



const removewishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const wishlist = await wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        );

        if (!wishlist) {
            return res.status(400).json({
                success: false,
                message: "No wishlist found for this user.",
            });
        }

        if (wishlist.products.length === 0) {
            await wishlist.deleteOne({ _id: wishlist._id });

            return res.status(200).json({
                success: true,
                message: "Item removed and wishlist cleared since it was empty.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item successfully removed from your wishlist.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




const getwishlist = async (req, res) => {
  try {
    const wishlist = await wishlist.findOne({ user: req.params.userId })
      .populate("products", "productName category sku stock variants");

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      data: wishlist,
      message: "wishlist retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the wishlist.",
    });
  }
};


module.exports = { addwishlist, removewishlist, getwishlist }