import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URL;

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: Number
        }
    ]
});

const CartModel = mongoose.model('Cart', cartSchema);

mongoose.connect(MONGO_URI)
    .then(async () => {
        const cart = [
            {
                products: []
            }
        ];
        try {
            const savedProducts = await CartModel.insertMany(cart);
            console.log(savedProducts);
        } catch (error) {
            console.error('Error:', error);
        }
    })
    .catch((error) => console.log(error));

export default CartModel;