const express = require("express");
const routes = express.Router();

const base = require('../controllers');
const middleware = require('../middlewares');


routes.post('/setup', base.addRouter, middleware.response);


module.exports = routes;