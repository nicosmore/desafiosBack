const MongoContainer = require('../../container/mongo.container');
const userSchema = require('../../schemas/mongo.schemas/user.schema');
const { HttpError, HTTP_STATUS } = require("../../../utils/api.utils");
const CartMongoDao = require('../carts/carts.mongo.dao');
const CartDTO = require('../../dtos/carts.dto');

const collection = 'users';
const Cart = new CartMongoDao();


class UserMongoDao extends MongoContainer {
    constructor() {
        super(collection, userSchema);      }
    
      async createUser(userItem) {        
        try {          
          const user = await this.save(userItem);
          const cartItem = new CartDTO; 
          cartItem.user = user._id;  
          const cart = await Cart.save(cartItem); 
          user.cart = [cart._id];   
          await user.save();       
          return user;
        }
        catch(error) {
          if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
          }
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }   
      }; 
          
      async getByEmail(email) {
        try {
          const document = await this.model.findOne({ email }, { __v: 0 });
          if (!document) {
            const errorMessage = `Wrong username or password`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
          } else {
            return document;
          }
        }
        catch(error) {
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
      }
};
//usersSchema.index({email: 1});
module.exports = UserMongoDao;