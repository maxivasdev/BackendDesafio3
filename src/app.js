const express = require('express')
const ProductManager = require('./product-manager')

const app = express();
const manager = new ProductManager('./products.json');

app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    const products = await manager.getProducts(limit);   
    res.send(products)
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id
    const product = await manager.getProductById(id)
    res.send(product)
})

app.listen(3000, () => {
    console.log(`Listening on port: 3000`);
})