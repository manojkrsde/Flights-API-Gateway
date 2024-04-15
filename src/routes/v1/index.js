const express = require('express');
const { PingCheckController } = require('../../controllers/');

const userRoutes = require('./user.routes');

const v1Routes = express.Router();

/**
 * api/v1/ping
 */

v1Routes.get('/ping', PingCheckController);

/**
 * api/v1/users
 */

v1Routes.use('/user', userRoutes);

module.exports = v1Routes;