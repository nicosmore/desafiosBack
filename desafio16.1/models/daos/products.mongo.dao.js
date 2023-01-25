const MongoContainer = require("../containers/Mongodb.container");
const productSchema = require('../schemas/products.schema');

const collection = "products";

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productSchema);
  }
}

module.exports = ProductsMongoDao;