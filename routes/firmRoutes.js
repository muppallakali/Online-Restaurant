let express=require("express")
const firmControler=require("../controler/firm_controler")
const router=express.Router()
const verifyToken=require("../middlewares/verifyTocken")
router.post("/add-firm",verifyToken,firmControler.addFirm)
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName
    req.headersSent("Contento-Type","image/jppeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})
router.delete("/:firmId",firmControler.deleteFirmById)
module.exports=router