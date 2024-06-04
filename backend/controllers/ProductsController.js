import express from 'express';
import ProductModel from "../models/ProductsModel.js";

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

export default router;
