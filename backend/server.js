import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import path from 'path';
const app = express()
connectDB();
const PORT = process.env.PORT || 3000

const __dirname= path.resolve()

app.use(express.json()); 

app.use('/api/products' , productRoutes);

if(process.env.Node_ENV === 'production'){
    app.use(express.static(path.join(__dirname , './frontend/build')))

    app.get('*' , (req,res) =>{
        res.sendFile(path.join(__dirname , './frontend/build/index.html'))
    })
}

app.listen(PORT , (req , res) =>{
    console.log(`server is running on port ${process.env.PORT}`)
});
