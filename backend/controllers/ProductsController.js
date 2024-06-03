import express from 'express';
import ProductModel from "../models/products.js";

const router = express.Router();

router.get('/products', async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
});

router.post('/products', async (req, res) => {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(204).send();
});

export default router;
