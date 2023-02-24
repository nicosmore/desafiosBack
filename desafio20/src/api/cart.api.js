const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { CartsDao } = require('../models/daos/daos.factory');
const CartsDTO = require('../models/dtos/carts.dto');

const cartsDao = new CartsDao();

class CartsApi {
    constructor(){

    }

    async createCart() {  
        const cartDTO = new CartsDTO();
        return cartsDao.save(cartDTO);
    }

    async deleteCart(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.delete(id);
    }

    async listCartProds(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.listCartProds(id);
    }

    async addProds(IdCar, IdProd) {
        if (!IdCar || !IdProd) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.addProductToCart(IdCar, IdProd);
    }

    async deleteProductCart(IdCar, IdProd) {
        if (!IdCar || !IdProd) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.removeProductFromCart(IdCar, IdProd);
    }

}

module.exports = CartsApi;