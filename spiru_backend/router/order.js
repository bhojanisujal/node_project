const router = require('express').Router();
const {
  placeOrder,
  getAllOrders,
  getUserOrders,
  modifyOrderStatus,
  byadminDeleteOrder
} = require('../controller/order');



router.post("/create", placeOrder);
router.get("/get-all", getAllOrders);
router.get("/user/:userId", getUserOrders);
router.put("/update-status/:orderId", modifyOrderStatus);
router.delete("/remove/:orderId", byadminDeleteOrder);

module.exports = router;
