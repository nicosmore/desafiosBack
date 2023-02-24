const CartsApi = require("../api/products.api");
const { successResponse, HTTP_STATUS } = require("../utils/api.utils");

const cartsApi = new CartsApi();

class CartsControllers {

  createCart = async (ctx, next) => {
    try{
      const newCart = await cartsApi.createCart(); 
      const response = successResponse(newCart);
      ctx.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error){
      next(error);
    }   
  };  

  deleteCart = async (ctx, next) => {
    const { Id } =  ctx.params;
    try{
      const delCart = await cartsApi.delete(Id);
      const res = successResponse(delCart);
      ctx.response.status(HTTP_STATUS.CREATED).json(res);
    }
    catch(error){
      next(error);
    }  
  };

  listCartProds = async (ctx, next) => { 
  const { Id } =  ctx.params;
    try {
      const products = await cartsApi.listCartProds(Id)
      const response = successResponse(products)
      ctx.response.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
      next(error);
    }     
  };

  addProds = async (ctx, next) => {
    const { IdCar, IdProd } =  ctx.params;    
    try {
      const products = await cartsApi.addProds(IdCar, IdProd)
      const res = successResponse(products)
      ctx.response.status(HTTP_STATUS.OK).json(res)
    }
    catch(error){
    next(error);
    }     
  }

  deleteProductCart = async (ctx, next) => {
    const { IdCar,IdProd } =  ctx.params;
    try {
      const products = await cartsApi.deleteProductCart(IdCar, IdProd)
      const res = successResponse(products)
      ctx.response.status(HTTP_STATUS.OK).json(res)
    }
    catch(error){
    next(error);
    }     
 }
 
}

module.exports = CartsControllers