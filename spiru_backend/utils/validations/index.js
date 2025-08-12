// const  userSchema  = require("./userSchema")
// const userLoginSchema  = require("./userSchema")

const productSchema = require("./productvalidationSChema");
const { userSchema, userLoginSchema, changepasswordSchema } = require("./userSchema");

 module.exports = {
    userSchema,
    userLoginSchema,
changepasswordSchema,productSchema}

 