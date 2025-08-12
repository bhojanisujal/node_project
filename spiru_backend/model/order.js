const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        cartId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
        },
      },
    ],
    totalAmount: {
        type: Number,
        default: 0
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    dispatchDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["Dispatch", "Approved", "Out Of Delivery","Cancelled"],
      default: "Approved",
    },
    address: [
        {
            city: {
                type: String,
            },
            pincode: {
                type: Number,
                min: 6
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            addressLine: {
                type: String,
            },
        }
    ]
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;