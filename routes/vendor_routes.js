let vendor_controler=require("../controler/vendorControler")
let express=require("express")
const router=express.Router()
router.post("/register",vendor_controler.vendorRegister)
router.post("/login",vendor_controler.vendorLogin)
router.get("/all-vendors",vendor_controler.getAllVendors)
router.get("/single-vendor/:id",vendor_controler.getVendorById)
module.exports=router;