

const CrudRepository = require('./crud.repository');

const { user_role } = require('../models');


class UserRoleRepository extends CrudRepository {


    constructor() {
        super(user_role);
    }

    async getUserRole(userId, roleId) {

        const userRole = await this.model.findOne({
            where: {
                user_id: userId,
                role_id: roleId
            }
        });

        return userRole;
    }

}

module.exports = UserRoleRepository;