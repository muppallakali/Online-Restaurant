let mongoose=require("mongoose")

let firm_model=new mongoose.Schema({
    firmName:{type:String,required:true},
    area:{type:String,required:true},
    category:{
        type:[
        {
            type:String,
            enum:["veg","non-veg"]
        }
    ]},
    region:{
        type:[
            {
                type:String,
                enum:["south-indian","north-indian","chinese","bakery"]
            }
        ]
    },
    offer:{type:String},
    image:{type:String},
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})
module.exports=mongoose.model("firm",firm_model)