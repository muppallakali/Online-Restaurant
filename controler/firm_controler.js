const { default: mongoose } = require("mongoose")
const Firm=require("../modules/firm_modules")
const Vendor=require("../modules/vendor_modules")
const multer=require("multer")
const path=require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));  // Adjusted for absolute path
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
  
  

let addFirm=async(req,res)=>{
  
    try{
        const{firmName,area,category,region,offer}=req.body
        const image=req.file?req.file.filename:undefined;
        const vendor=await Vendor.findById(req.vendorid)
        if(!vendor){
            return res.status(401).json({message:"vendor id dont match"})
        }
        if(vendor.firm.length>0){
            return res.status(400).json({message:"vendor can have only one firm"})
        }
        const firm=new Firm({firmName,area,category,region,offer,image,vendor:vendor._id})
        const savedFirm=await firm.save()
        const firmId=savedFirm._id
        vendor.firm.push(savedFirm)
        await vendor.save()      
        return res.status(200).json({message:"saved succesfully",firmId})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"there was some errror sorry"})
    }
}
const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmId
        const deletedProduct=await Firm.findByIdAndDelete(firmId)
        if(!deletedProduct){
            return res.status(500).json({error:"No product found to delete"})
        }
        res.status(200).json({ message: "Firm deleted successfully" })
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"error in deleteProductById"})
    }
}

module.exports={
    addFirm:[ upload.single("image"),addFirm],deleteFirmById
}

