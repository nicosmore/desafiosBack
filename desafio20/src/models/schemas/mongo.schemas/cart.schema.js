const { Schema } = require('mongoose');

const cartSchema = new Schema({
    timestamp: { type: Date, required: true},    
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    products: { type: Array, required: true, default: [] }
  });

module.exports = cartSchema;