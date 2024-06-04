import express from 'express';
import CartModel from "../models/ShoppingCartModel.js";

const router = express.Router();

router.get('/cart', async (req, res) => {
    try {
        const cart = await CartModel.findOne().populate('products.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

router.put('/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await CartModel.findOne();
        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error updating cart', error });
    }
});

router.delete('/cart/removeOne/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        let cart = await CartModel.findOne();
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
            cart = await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error removing product from cart', error });
    }
});


router.delete('/cart/removeAll/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        let cart = await CartModel.findOne();
        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error removing product from cart', error });
    }
});

router.delete('/cart', async (req, res) => {
    try {
        let cart = await CartModel.findOne();
        cart.products = [];
        cart = await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error clearing cart', error });
    }
});

export default router;
