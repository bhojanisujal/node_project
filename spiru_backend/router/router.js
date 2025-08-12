const router = require("express").Router();

const auth = require("./auth");
const product = require("./product");
// const buyproduct = require("./buyproduct");
const wishlist = require("./wishlist");
const category = require("./category");
const addToCart = require("./addtocart");
const review = require("./review");
const order = require("./order");
const content = require("./content");
const media = require("./media");


router.use("/auth", auth);
router.use("/product", product);
// router.use("/buyproduct", buyproduct);
router.use("/wishlist", wishlist);
router.use("/category", category);
router.use("/addToCart", addToCart);
router.use("/review", review);
router.use("/order", order);  
router.use( "/content", content);  
router.use( "/media", media);  


module.exports = router;
