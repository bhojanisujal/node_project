const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [ 
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
          
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
