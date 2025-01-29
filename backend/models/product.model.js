import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema ({
    name:{
        type:String,
        required:true
    } , 
    price :{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
},{
    timestamps:true //created at updated at
}

);

const Product = mongoose.model('Product' , productSchema)  // Product will change to products in mongoDB

export default Product