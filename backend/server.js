const express = require('express');
const cors = require('cors');


const app = express();
const port = 3306;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection()({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "myschema",
});

app.get('/', (re, res) => {
    return res.send('Hello World!');
});
app.get('/product', (req, res) => {
    const SQL = "SELECT * FROM products;";
    db.query(SQL, (err, result) => {
        if (err) {
            return res.json({ error: err });
        } else {
            return res.json(result);
        }
    });

});
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
