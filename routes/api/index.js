///package up my api routes

const router = require('express').Router();

// const { route } = require('./user-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;