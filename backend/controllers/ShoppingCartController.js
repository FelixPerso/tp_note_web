import express from 'express';
import CartModel from "../models/shoppingCart.js";

const router = express.Router();

router.get('/cart', async (req, res) => {
    const cart = await CartModel.findOne().populate('products.productId');
    res.json(cart);
});

router.post('/cart', async (req, res) => {
    const cart = new CartModel(req.body);
    await cart.save();
    res.status(201).json(cart);
});

router.put('/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await CartModel.findOne();
    const existingProduct = cart.products.find(p => p.productId.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ productId, quantity });
    }

    cart = await cart.save();
    res.json(cart);
});

router.put('/cart/remove', async (req, res) => {
    const { productId } = req.body;
    let cart = await CartModel.findOne();

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    cart = await cart.save();
    res.json(cart);
});

router.delete('/cart', async (req, res) => {
    await CartModel.deleteOne();
    res.status(204).send();
});

export default router;
