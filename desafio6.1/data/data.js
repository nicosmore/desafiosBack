const products = [
 /*  {
    id: 1,
    name: "auto",
    price: 323.45,
    image: "https://cdn1.iconfinder.com/data/icons/cars-01-1/512/car-128.png"
  },
  {
    id: 2,
    name: "camioneta",
    price: 234.56,
    image: "https://cdn1.iconfinder.com/data/icons/cars-01-1/512/cab-128.png"
  }
   */
];

class Products {
  //static lastProductId = products[products.length - 1].id;
  
  constructor() {
    this.list = products;
  }

  getAll() {
    return this.list;
  }

  save(product) {
    const { name, price, image } = product;
    if ( !name || !price || !image) {
      return null;
    }
    Products.lastProductId++;
    const newProduct = {
      id: Products.lastProductId,
      name,
      price,
      image
    };
    this.list.push(newProduct);
    return newProduct;
  };

 /*  updateById(productId, product) {
    const productIndex = this.list.findIndex((producto) => producto.id === +productId);
    if (productIndex < 0) return null;
    const {
      nombre,
      descripcion,
      precio,
      imagen
    } = product;
    const updatedProduct = {
      id: this.list[productIndex].id,
      nombre,
      descripcion,
      precio,
      imagen
    };
    this.list[productIndex] = updatedProduct;
    return updatedProduct;
  } 

  getById(productId) {
    return this.list.find(product => product.id === +productId);
  }

  deleteById(productId) {
    const productIndex = this.list.findIndex((producto) => producto.id === +productId);
    if (productIndex < 0) return null;
    return this.list.splice(productIndex, 1);
  } */
}

module.exports = Products;

