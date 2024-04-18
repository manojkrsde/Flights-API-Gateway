

const CrudRepository = require('./crud.repository');

const { user_role } = require('../models');


class UserRoleRepository extends CrudRepository {


    constructor() {
        super(user_role);
    }

}

module.exports = UserRoleRepository;