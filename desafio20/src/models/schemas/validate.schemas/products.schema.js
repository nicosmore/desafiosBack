const yup =  require('yup');

class ProductsSchema {

  static #schema = yup.object({
    name: yup.string().required(),    
    description: yup.string().required(),
    code: yup.string().required(),
    image: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    stock: yup.number().required(),
  })

  constructor(products) {
    Object.assign(this, products);
  }

  static async validate(productValidate){
    return await ProductsSchema.#schema.validate(productValidate);
  }
}

module.exports = ProductsSchema;