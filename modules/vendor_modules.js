let mongoose=require("mongoose")
// const { type } = require("os")

let vendor_schema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm"
    }]
})
let vendor=mongoose.model("vendor",vendor_schema)
module.exports=vendor