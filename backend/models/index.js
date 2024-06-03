const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite')
});

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

const Cart = sequelize.define('Cart', {
});

Cart.hasMany(Product);
Product.belongsTo(Cart);

const initializeDatabase = async () => {
    await sequelize.sync({ force: true });

    await Product.bulkCreate([
        { name: "Aurora Lamp", desc: "A beautiful lamp with aurora light effect", price: 10, stock: 45 },
        { name: "Zen Garden Kit", desc: "A small zen garden for your desk", price: 20 , stock: 12 },
        { name: "Eco-Friendly Notebook", desc: "Notebook made from recycled materials", price: 30, stock: 41 },
        { name: "Vintage Bluetooth Speaker", desc: "A speaker with a vintage design", price: 40, stock: 31 },
        { name: "Smart Water Bottle", desc: "A water bottle that tracks your hydration", price: 50, stock: 5 },
        { name: "Wireless Charger Pad", desc: "A sleek pad for wireless charging", price: 60, stock: 6 },
        { name: "Portable Projector", desc: "A small projector for movies on the go", price: 70, stock: 4 },
        { name: "Ergonomic Office Chair", desc: "A chair designed for comfort during long hours", price: 80, stock: 25 },
        { name: "Noise Cancelling Headphones", desc: "Headphones that block out external noise", price: 90, stock: 13 },
        { name: "Smart Home Hub", desc: "A hub to control all your smart home devices", price: 100, stock: 17 },
        { name: "Electric Toothbrush", desc: "A toothbrush with multiple cleaning modes", price: 110, stock: 1 }
    ]);
};

module.exports = { Product, Cart, initializeDatabase };
