import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URL;

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    stock: Number,
});

const ProductModel = mongoose.model('products', productSchema);

mongoose.connect(MONGO_URI)
    .then(async () => {
        const products = [
            {"name": "Germinal 1", "description": "description germinal 1", "price": 10, "stock": 5},
            {"name": "Germinal 2", "description": "description germinal 2", "price": 20, "stock": 10},
            {"name": "Germinal 3", "description": "description germinal 3", "price": 30, "stock": 21},
            {"name": "Germinal 4", "description": "description germinal 4", "price": 40, "stock": 41},
            {"name": "Germinal 5", "description": "description germinal 5", "price": 50, "stock": 2},
            {"name": "Germinal 6", "description": "description germinal 6", "price": 60, "stock": 14},
            {"name": "Germinal 7", "description": "description germinal 7", "price": 70, "stock": 32},
            {"name": "Germinal 8", "description": "description germinal 8", "price": 80, "stock": 41},
            {"name": "Germinal 9", "description": "description germinal 9", "price": 90, "stock": 74},
            {"name": "Germinal 10", "description": "description germinal 10", "price": 100, "stock": 1}
        ];
        try {
            const savedProducts = await ProductModel.insertMany(products);
            console.log(savedProducts);
        } catch (error) {
            console.error('Error:', error);
        }
    })
    .catch((error) => console.log(error));

export default ProductModel;