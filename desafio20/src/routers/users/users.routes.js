const Router = require("koa-router"); 
const UsersControllers = require('../../controllers/users.controller');
const usersCont = new UsersControllers();

const router = new Router({
    prefix: "/user"
});

module.exports = router;