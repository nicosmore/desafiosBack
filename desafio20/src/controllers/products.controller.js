const ProductsApi = require("../api/products.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const productsApi = new ProductsApi();

class ProductsController {
  constructor() {}

  getProducts = async (ctx, next) => {
    try {
      const products = await productsApi.getProducts();
      const res = successResponse(products);
      ctx.response.status(HTTP_STATUS.OK).json(res);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (ctx, next) => {
    const { Id } = ctx.params;
    try {
      const products = await productsApi.getProductById(Id);
      const res = successResponse(products);
      ctx.response.status(HTTP_STATUS.OK).json(res);
    } catch (error) {
      next(error);
    }
  };

  getProductCategory = async (ctx, next) => {
    const { category } = req.params;
    try {
      const products = await productsApi.getProductCategory(category);
      const res = successResponse(products);
      ctx.response.status(HTTP_STATUS.OK).json(res);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (ctx, next) => {
    const productPayload = ctx.request.body;
    try {
      const newProduct = await productsApi.createProduct(productPayload);
      const res = successResponse(newProduct);
      ctx.response.status(HTTP_STATUS.CREATED).json(res);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (ctx, next) => {
    const { Id } = ctx.params;
    const productPayload = ctx.request.body;
    try {
      const updateProduct = await productsApi.updateProduct(Id, productPayload);
      const res = successResponse(updateProduct);
      ctx.response.status(HTTP_STATUS.OK).json(res);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (ctx, next) => {
    const { Id } = ctx.params;
    try {
      const deletedProduct = await productsApi.deleteProduct(Id);
      const res = successResponse(deletedProduct);
      ctx.response.status(HTTP_STATUS.OK).json(res);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = ProductsController;
