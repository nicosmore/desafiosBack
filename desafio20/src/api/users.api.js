const UserSchema = require('../models/schemas/validate.schemas/user.schema');
const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { UsersDao } = require('../models/daos/daos.factory');
const UserDTO = require('../models/dtos/user.dto');

const usersDao = new UsersDao();

class UsersApi {
    constructor(){

    }

    async getUsers() {  
        return await UsersDao.getAll();        
    }

    async createUser (userPayload) {
        await UserSchema.validate(userPayload);
        const userDTO = new UserDTO(userPayload);
        return await usersDao.save(userDTO);
    }

    async getByEmail(username) {
        if (!username){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.getByEmail(id);
    }

    async getById(id) {
        if (!id){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'The id param is required');
        }
        return await cartsDao.getById(id);
    }
}

module.exports = UsersApi;