const { default: mongoose } = require("mongoose")
let moongoose=require("mongoose")
const { type } = require("os")

let productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    bestSeller:{
        type:Boolean
    },
    description:{
        type:String
    },
    image:{
        type:String
    },   
   
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm"
    }]
})
module.exports=mongoose.model("Products",productSchema)