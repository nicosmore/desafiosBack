const Router = require("koa-router"); 
const CartsController = require('../../controllers/carts.controller');
const carCont = new CartsController();

const router = new Router({
    prefix: "/cart"
});


router.post('/', carCont.createCart);
router.delete('./:Id', carCont.deleteCart);
router.get('/:Id/products', carCont.listCartProds);
router.post('/:IdCar/:IdProd', carCont.addProds);
router.delete('/:IdCar/:IdProd', carCont.deleteProductCart);


module.exports = router; 