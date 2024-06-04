import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductsController from './controllers/ProductsController.js';
import ShoppingCartController from './controllers/ShoppingCartController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URL;

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.log(error));

app.use('/api', ProductsController);
app.use('/api', ShoppingCartController);
