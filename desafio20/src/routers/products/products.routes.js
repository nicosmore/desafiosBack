const Router = require("koa-router"); 
const ProductsControllers = require('../../controllers/products.controller');

const router = new Router({
    prefix: "/products"
});


const productsController = new ProductsControllers();

router.get('/', productsController.getProducts);
router.get('/:Id', productsController.getProductById);
router.get('/:category', productsController.getProductCategory);
router.post('/', productsController.createProduct);
router.put('/:Id', productsController.updateProduct);
router.delete('/:Id', productsController.deleteProduct);

module.exports = router;