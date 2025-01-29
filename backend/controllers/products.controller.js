import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req,res) =>{
    try{
        const products = await Product.find({})
        res.status(200).json({success : true , data : products})
    }
    catch(error){
        console.log('Error Occured' , error)

    }
}


export const createProduct= async (req,res) =>{
    const product = req.body;  // user will send this data

    if(!product.name || !product.price){
        return res.status(400).json({success: false , message: 'Please fill in all fields'});
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save()
        res.status(201).json({success: true , message: 'Product created successfully'});

    }
    catch (error){
        console.log(`Error occured : ${error}`)
        res.status(500).json({success:false , message:'Server error'})

    }
}

export const deleteProduct = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false , message: 'Invalid id'}); 
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true , message:'User deleted successfully'})
    }

    catch(error){
        console.log(`Error occured : ${error}`)
        res.status(400).message('Server Error' , error)

    }
}

export const updateProduct =  async(req , res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false , message: 'Invalid id'}); 
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id ,product , {new:true} )
        res.status(200).json({success:true , data:updatedProduct})

    }catch{
        console.log(`Error occured : ${error}`)
    }
}