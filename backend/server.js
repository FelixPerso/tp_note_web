const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./models');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
});
