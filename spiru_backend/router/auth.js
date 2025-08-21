const { loginUser, regesterUser, verifyeEmail, verifyeOtp, resetpassword, profile, changePssword } = require("../controller/auth");
const authorization = require("../middlewares/authorization");
const { uservalidationAsyc } = require("../utils/validationsAsyc");

const router = require("express").Router();

router.post("/regester",authorization(["Admin","User"]) ,uservalidationAsyc("userSchema"), regesterUser);
router.post("/login",authorization(["Admin","User"]),uservalidationAsyc("userLoginSchema"), loginUser);
router.post("/email_vatrfy",verifyeEmail);
router.post("/otp_vatrfy",verifyeOtp);
router.post("/resetpassword",resetpassword);
router.get("/profile",authorization(["Admin","User"]),profile);
router.post("/changePssword",authorization(["User"]) ,uservalidationAsyc("changepasswordSchema"),changePssword);


module.exports = router;
