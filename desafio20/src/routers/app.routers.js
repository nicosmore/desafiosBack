const Router = require("koa-router"); 
const productsRoutes = require("./products/products.routes");
const cartsRoutes = require("./carts/carts.routes");
const usersRoutes = require("./users/users.routes");
const authRoutes = require("./auth/auth.routes");

const router = new Router({
    prefix: "/api"
});

router.use(productsRoutes.routes());
router.use(cartsRoutes.routes());
router.use(usersRoutes.routes());
router.use(authRoutes.routes());


module.exports = router;