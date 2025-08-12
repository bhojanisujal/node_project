const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = (role) => async (req, res, next) => {
  // const authorization = req.get("authorization");
  const token = req.cookies.accessToken;
  // console.log(req.cookies.accessToken)
  // if (!authorization)
  //   return res.status(403).json({ message: "Token reqiured" });
  // // const token = authorization.split(" ")[1];
  // console.log(token);
  try {
    const decodeToken = jwt.verify(token, "sujal199");

    const user = await User.findById(decodeToken.userId).select(
      " -otp -otpexpirAt"
    );
    if (!role.includes(user.role)) return res.status(401).json({
      success: false, message: "unauthorization User"
    })


    // console.log(decodeToken, "decodeToken");
    // console.log(user, "auth");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
