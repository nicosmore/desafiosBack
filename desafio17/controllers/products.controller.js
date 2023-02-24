const { HTTP_STATUS } = require("../constants/api.constants");
const  ProductsDao = require("../models/daos/products.mongo.dao");
const { successResponse } = require("../utils/api.utils");

const productsDao = new ProductsDao();

class ProductsControllers {
  
  getProducts = async (ctx, next) => { 
    try {
      const products = await productsDao.getAll();
      const response = successResponse(products)
      ctx.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
      next(error);
    }     
  };

  getProductsById = async (ctx, next) => {   
    const { Id } =  ctx.params;
    try{
      const products = await productsDao.getById(Id);
      const response = successResponse(products);
      ctx.status(HTTP_STATUS.OK).json(response);
    }
    catch(error){
      next(error)
    }
  };

  saveProduct = async (ctx, next) => {
    try {
      const newProduct = await productsDao.save(req.body);
      const response = successResponse(newProduct);
      ctx.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  };

  updateProductsById = async (ctx, next) => {
    const { Id } = ctx.params;
    try {
      const updateProduct = await productsDao.update(Id, ctx.body);
      const response = successResponse(updateProduct);
      ctx.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  };

  deleteProductsById = async (ctx, next) => {
    const { Id } = ctx.params;
    try {
      const deletedProduct = await productsDao.delete(Id);
      const response = successResponse(deletedProduct);
      ctx.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    };      
  };
}  
  module.exports = ProductsControllers;
  