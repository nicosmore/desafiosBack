class ProductDTO {
    constructor(productoItem, id){
        Object.assign(this, productoItem);
        this.createdAt = productoItem.createdAt || new Date().toISOString(); 
        this.updatedAt = new Date().toISOString();
        if(id) {
            this._id = id;
        }
    }
}
module.exports = ProductDTO;