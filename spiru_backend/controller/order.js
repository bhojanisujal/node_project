const OrderModel = require("../model/order");

const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, address } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Required fields missing." });
    }

    const newOrder = await OrderModel.create({
      userId,
      items,
      totalAmount,
      address,
      status: "Approved",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: newOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, message:err});
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.aggregate([
      // Join with user details
      {
        $lookup: {
          from: "users", // must match MongoDB collection name
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },

      // Unwind order items
      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },

      // Join each cart
      {
        $lookup: {
          from: "addtocarts",
          localField: "items.cartId",
          foreignField: "_id",
          as: "cartInfo",
        },
      },
      { $unwind: { path: "$cartInfo", preserveNullAndEmptyArrays: true } },

      // Unwind each item inside the cart
      { $unwind: { path: "$cartInfo.items", preserveNullAndEmptyArrays: true } },

      // Join cart item's product
      {
        $lookup: {
          from: "products",
          localField: "cartInfo.items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },

      // Join cart item's variant
      {
        $lookup: {
          from: "products",
          localField: "cartInfo.items.variant",
          foreignField: "_id",
          as: "variantDetails",
        },
      },
      { $unwind: { path: "$variantDetails", preserveNullAndEmptyArrays: true } },

      // Re-group all items under each order
      {
        $group: {
          _id: "$_id",
          user: { $first: "$userDetails" },
          address: { $first: "$address" },
          totalAmount: { $first: "$totalAmount" },
          orderDate: { $first: "$orderDate" },
          dispatchDate: { $first: "$dispatchDate" },
          status: { $first: "$status" },
          items: {
            $push: {
              cartId: "$items.cartId",
              product: "$productDetails",
              variant: "$variantDetails",
              quantity: "$cartInfo.items.quantity",
            },
          },
        },
      },

      // Sort by latest order
      { $sort: { orderDate: -1 } }
    ]);

    res.status(200).json({ success: true, data: allOrders });
  } catch (err) {
    console.error("Order get error:", err);
    res.status(500).json({ success: false, message: "Server error occurred." });
  }
};



const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const userOrders = await OrderModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: userOrders });
  } catch (err) {
    console.error("User order retrieval error:", err);
    res.status(500).json({ success: false, message: "Server issue." });
  }
};

const modifyOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Dispatch", "Approved", "Out Of Delivery", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid order status." });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, message: "Order status updated.", data: updatedOrder });
  } catch (err) {
    console.error("Order status update error:", err);
    res.status(500).json({ success: false, message: "Internal error." });
  }
};

const   byadminDeleteOrder = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    const removedOrder = await OrderModel.findByIdAndDelete(req.params.orderId);

    if (!removedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, message: "Order removed successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getUserOrders,
  modifyOrderStatus,
  byadminDeleteOrder
};
