class UserDTO {
    constructor(userItem, id){
        Object.assign(this, userItem);
        this.createdAt = userItem.createdAt || new Date().toISOString(); 
        this.updatedAt = new Date().toISOString();
        this.cart = null;
        if(id) {
            this._id = id;
        }
    }
}
module.exports = UserDTO;
