let express=require("express")
let router=express.Router()
let productcontroler=require("../controler/productControler")
const productControler = require("../controler/productControler")

router.post("/add-product/:firmid",productcontroler.addProduct)
router.get("/:firmId/products",productcontroler.getProductByFirm)
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName
    req.headersSent("Contento-Type","image/jppeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
})
router.delete("/:productId",productControler.deleteProductById)
module.exports=router