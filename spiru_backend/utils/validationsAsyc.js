const validate = require("./validations")
const uservalidationAsyc = (validationReq) => async (req,res,next) => {

    if (!validate[validationReq]) return res.status(404).json({ success: false, message: "validatin is not found" })

    try {
        const value = await validate[validationReq].validateAsync(req.body);
        req.body = value;
        next();
    }
    catch (err) 
    {
        return res.status(400).json({ success: false, message: err.message })
     }
}
const productvalidationAsyc = (validationReq) => async (req,res,next) => {

    if (!validate[validationReq]) return res.status(404).json({ success: false, message: "validatin is not found" })

    try {
        const value = await validate[validationReq].validateAsync(req.body);
        req.body = value;
        next();
    }
    catch (err) 
    {
        return res.status(400).json({ success: false, message: err.message })
     }
}

module.exports = {

    uservalidationAsyc,productvalidationAsyc
}