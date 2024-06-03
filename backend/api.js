import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URL;
console.log(MONGO_URI);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
});

const ProductModel = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
});