// const loginuser = require("../modal/login");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otpvatify = require("../utils/otpganret");
// const { findById } = require("../modal/user");
const fs = require("fs");
const { parseArgs } = require("util");

const htmlfile = fs.readFileSync("index.html", "utf-8");


// ovot ypaa hbae jljb

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajputsujal719@gmail.com",
    pass: "ovot ypaa hbae jljb",
  },
});


const regesterUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {


    const existsuser = await User.findOne({ email });
    if (existsuser)
      return res.status(404).json({
        success: false,
        meassage: "user alrady exists",
      });

    const otp = otpvatify();
    const otpexpirAt = Date.now() + 1000 * 60;

    const hashpassword = await bcrypt.hash(password, 10);
    const fainaklotp = htmlfile.replace("${otp}", otp);
    //  console.log(otp)
    let mailOptions = {
      from: "rajputsujal719@gmail.com",
      to: "traxxstarneo@gmail.com",
      subject: "Sending Email using Node.js",
      html: fainaklotp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const playlode = {
      firstName,
      lastName,
      email,
      password: hashpassword,
      phone,
      otp,
      otpexpirAt,
    };

    const user = await User.create(playlode);
    return res.status(201).json({
      success: true,
      data: { ...user._doc, password: undefined, otp: undefined },
      meassage: "user regester successfully..!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log(req.user, "req.user");

    let loginUser = await User.findOne({ email, Isverify: true });
    if (!(email && password))
      return res.status(404).json({
        success: false,
        meassage: "user not found",
      });

    const ispassword = await bcrypt.compare(password, loginUser.password);

    if (!ispassword)
      return res.status(404).json({
        success: false, 
        meassage: "Email or Password invalid",
      });

    if (!loginUser)
      return res.status(404).json({
        success: false,
        meassage: "Email or Password invalid",
      });
    // console.log(loginUser, "loginUser");


    const token = jwt.sign(
      {
        userId: loginUser._id,
        firstName: loginUser.firstName,
        lastName: loginUser.lastName,
        email: loginUser.email,
        phone: loginUser.phone,
        role: loginUser.role,
      },
      "sujal199",
      { expiresIn: "101d" }
    );
    return res
      .status(200)
      .cookie("accessToken", token, {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .json({
        success: true,
        token: token,
        message: "Logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const verifyeEmail = async (req, res) => {
  const { email } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        meassage: "User not found",
      });


    const otp = otpvatify();
    const otpexpirAt = Date.now() + 1000 * 60;

    const fainaklotp = htmlfile.replace("${otp}", otp);
    //  console.log(otp)
    let mailOptions = {
      from: "rajputsujal719@gmail.com",
      to: "traxxstarneo@gmail.com",
      subject: "Sending Email using Node.js",
      html: fainaklotp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await User.updateOne({ _id: user._id }, { $set: { otp, otpexpirAt } });

    return res.status(200).json({
      success: true,
      message: "Email varify successfully..!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const verifyeOtp = async (req, res) => {
  try {
    const { otp, userId: _id, type } = req.body;
    const user = await User.findOne({
      _id,
      otp,
      otpexpirAt: { $gt: Date.now() },
    });
    if (!user)
      return res.status(404).json({
        success: false,
        meassage: "Invalid otp or otpexpir..!",
      });

    const Isverify = type == "resetpassword" ? user.Isverify : true;

    await User.updateOne(
      { _id: user._id },
      { $set: { otp, otpexpirAt: Date.now() }, Isverify }
    );

    return res.status(200).json({
      success: true,
      meassage: "Otp verify successfull..!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const resetpassword = async (req, res) => {
  const { password, userId: _Id } = req.body;
  try {
    const user = await User.findById(_Id);

    if (!user)
      return res.status(404).json({
        success: false,
        meassage: "User not found..!",
      });

    const ispassword = await bcrypt.hash(password, 10);

    await User.updateOne({ _id: user._id }, { $set: { password: ispassword } });

    return res.status(200).json({
      success: true,
      meassage: "reset password successfull..!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const profile = (req, res, __) => {
  try {
    // console.log(req.user,"user req")
    return res.status(200).json({
      success: true,
      data: { ...req.user._doc, password: undefined },
      message: "get profile data...!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const changePssword = async (req, res) => {
  try {
    const { oldPasseword, newPasseword } = req.body;
    const ispassword = await bcrypt.compare(oldPasseword, req.user.password);

    if (!ispassword)
      return res.status(404).json({
        success: false,
        meassage: "old password is not mach",
      });

    const hashpassword = await bcrypt.hash(newPasseword, 10);

    // console.log(hashpassword,"hashpassword")

    // console.log(req.user,"user")

    await User.updateOne(
      { _id: req.user._id },
      { $set: { password: hashpassword } }
    );

    return res.status(200).json({
      success: true,
      message: "change password successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

module.exports = {
  regesterUser,
  loginUser,
  verifyeEmail,
  verifyeOtp,
  resetpassword,
  profile,
  changePssword,
};
