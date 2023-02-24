const ProductsSchema = require('../models/schemas/validate.schemas/products.schema');
const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { ProductsDao } = require('../models/daos/daos.factory');
const ProductDTO = require('../models/dtos/products.dto');

const productsDao = new ProductsDao();

class ProductsApi {
    
    constructor(){

    }

    async getProducts() {
        return await productsDao.getAll();
    }

    async getProductById(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await productsDao.getById(id);
    }

    async getProductByCategory(category){
        if (!category) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The category param is required');
        }
        return await productsDao.getByCategory(category);
    }

    async createProduct (productPayload) {
        await ProductsSchema.validate(productPayload);
        const productDTO = new ProductDTO(productPayload)
        return await productsDao.save(productDTO);
    }

    async updateProduct (id, productPayload) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        await ProductsSchema.validate(productPayload);
        return await productsDao.update(id, productPayload);
    }

    async deleteProduct (id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await productsDao.delete(id);
    }
        
}

module.exports = ProductsApi;
