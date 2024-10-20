let express=require("express")
let app=express()
let env=require("dotenv")
env.config()
let mongoose=require("mongoose")
let vendorRoutes=require("./routes/vendor_routes")
let bodyParser=require("body-parser")
let firmRoutes=require("./routes/firmRoutes")
let productRoutes=require("./routes/productRoutes")
let path=require("path")

//http://localhost:3000/vendor/register-post
//http://localhost:3000/vendor/login-post
//http://localhost:3000/firm/add-firm-post
//http://localhost:3000/vendor/all-vendors-get
//http://localhost:3000/vendor/single-vendor/670fde846826c8f1a5b8580d-get
//http://localhost:3000/product/add-product/6713b066afbb30b6e79d4ab1-post
//http://localhost:3000/product/6713b066afbb30b6e79d4ab1/products-get
// "username":"satya",
//     "email":"satya@123",
//     "password":"satya"
// {
//     "firmName":"kali",
//     "area":"columbus",
//     "category":["veg","non-veg"],
//     "region":["south-indian","north-indian","chinese","bakery"],
//     "offer":"30% off",
//     "image":"example.jpg"
// }


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb is connected successfully"))
.catch((error)=>{console.log("The error is: "+error)})
app.use(bodyParser.json())
app.use("/vendor",vendorRoutes)
app.use("/firm",firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"))
let port=3000;

// app.use("/",(req,res)=>{
//     res.send("hello guys")
// })

app.listen(port,()=>console.log(`server id running on port ${port}`))