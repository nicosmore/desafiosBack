class CartDTO {
    constructor(){
        Object.assign(this, cartItem);
        this.createdAt = cartItem.createdAt || new Date().toISOString(); 
        this.updatedAt = new Date().toISOString();
        this.user = null;
        if(id) {
            this._id = id;
        }
    }
}
module.exports = CartDTO;