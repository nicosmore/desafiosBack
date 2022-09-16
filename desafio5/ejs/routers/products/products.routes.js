const express = require('express');
//const { products } = require('../../data/data.js');
const  productsJson  = require('../../data/data.json');
const {products} = productsJson;

const router = express.Router();

//Routes
router.get('/', (req, res) => {     
    let productsResponse = [...products];    

    res.render("vista", {
      productos: productsResponse,
      hayProductos: productsResponse.length
  });
    //return res.json({success: true, result: productsResponse });      
  });

  router.get('/:Id', (req, res) => {
    const { Id } =  req.params;
    const product = products.find(product => product.id === +Id);
    if (!product) {
      return res.status(404).json({ success: false, error: `Produccto no id: ${Id} no encontrado`});
    } 
    return res.json({ success: true, result: product });
  });
  
router.post('/', (req, res) => {
    const { name, price, image } = req.body;
    if ( !name || !price || !image) {
      return res.status(400).json({ succes: false, error: 'Faltan datos' });
    }
    const newProduct = {
      id: products.length + 1,
      name,      
      price: +price,
      image
    };    
    products.push(newProduct);
    return res.redirect('/');
    //return res.json({ success: true, result: newProduct });
  });
  
router.put('/:Id', (req, res) => {
    const { params: { productId }, body: { name, price, image} } = req;
    if ( !name || !price || !image) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    };
    const productIndex = products.findIndex((product) => product.id === +productId);
    if (productIndex < 0) 
    return res.status(404).json({ success: false, error: `Produccto no id: ${productId} no encontrado`});
    const newProduct = {
      ...products[productIndex],
      name,      
      price,
      image
    };
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct});
  });
  
router.delete('/:Id', (req, res) => {
    const { Id } = req.params;
    const productIndex = products.findIndex(product => product.id === +Id);
    if (productIndex < 0) 
    return res.status(404).json({ success: false, error: `Produccto no id: ${Id} no encontrado`});
    products.splice(productIndex, 1);
    return res.json({ success: true, result: 'Producto Eliminado' });
  });



module.exports = router;