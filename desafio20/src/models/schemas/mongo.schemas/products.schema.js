const { Schema } = require('mongoose');

const productsSchema = new Schema({
    name: { type: String, required: true },
    createdAt: {type: Date, required: true },
    updatedAt: {type: Date, required: true },
    description: { type: String, required: true},
    code: { type: String, required: true, unique: true  },
    image: { type: String, required: true },
    price: { type: Number, required: true},
    category: { type: String, required: true},
    stock: { type: Number, required: true }
  });



module.exports = productsSchema;