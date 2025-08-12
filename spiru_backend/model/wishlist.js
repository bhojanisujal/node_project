const mongoose = require("mongoose")

const whishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]

}, { timestamps: true });

const whishlist = mongoose.model("whishlist", whishlistSchema);

module.exports = whishlist;
