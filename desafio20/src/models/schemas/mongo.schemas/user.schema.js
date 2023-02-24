const { Schema } = require('mongoose');
const { number } = require('yup');

const userSchema = new Schema({
    name: {type: String, required: true}, 
    lastname: {type: String,required: true},   
    phone: {type: Number, required: true},
    email: {type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },   
  password: {type: String, required: true},  
  createdAt: {type: Date, required: true },
  updatedAt: {type: Date, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: "carts", required: true }]
    
});

module.exports = userSchema;