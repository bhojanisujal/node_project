const mongoose = require("mongoose");
const { type } = require("../utils/validations/productvalidationSChema");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      reqiured: true,
      trim: true,
    },
    lastName: {
      type: String,
      reqiured: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      reqiured: true,
    },
    password: {
      type: String,
      reqiured: true,
    },
    phone:{
      type:String,
    },
    otp:{
      type:Number,
      require:true
    },
    otpexpirAt:{
      type:Date,
      default:Date.now
    },Isverify:{
      type:Boolean,
      default:false 
    },role:{
      type:String,
      enum:["Admin","User"],
      default:"User"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
