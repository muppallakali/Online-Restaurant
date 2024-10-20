const Vendor=require("../modules/vendor_modules")
let jwt=require("jsonwebtoken")
let dotenv=require("dotenv")
dotenv.config()
let secretKey=process.env.WhatIsYourName

const veerifyToken=async(req,res,next)=>{
    const token=req.headers.token;//barrer
    if(!token){
        return res.status(401).json({error:"Token is required"})
    }
    try{
        let decoded=jwt.verify(token,secretKey)
       const vendor=await Vendor.findById(decoded.vendorId)

       if(!vendor){
        return res.status(404).json({error:"vendor not found"})
       }
       req.vendorid = vendor._id;
       next()
    }
    catch(err){
        console.log(err)
        res.status(500).json("error in verifyToken")
    }
}
module.exports=veerifyToken