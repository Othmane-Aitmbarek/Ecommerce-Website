// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Simple in-memory storage (replace with a real database in production)
let products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 50 },
    { id: 2, name: 'Smartphone', category: 'Phones', price: 699.99, stock: 100 }
];

// CREATE - Add new product
app.post('/api/products', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(product);
    res.status(201).json(product);
});

// READ - Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// READ - Get single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// UPDATE - Update product
app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    
    res.json(product);
});

// DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
    
    products.splice(productIndex, 1);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));