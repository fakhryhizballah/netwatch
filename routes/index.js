const express = require("express");
const routes = express.Router();

const base = require('../controllers');
const middleware = require('../middlewares');


routes.post('/setup', base.addRouter, middleware.response);
routes.get('/setup/:group', base.getGrupRute, middleware.response);

routes.post('/v1/grup', base.postGrup, middleware.response);
routes.get('/v1/grup', base.getGrup, middleware.response);
routes.get('/v1/grup/:id', base.getGrupByName, middleware.response);
routes.post('/v1/member', base.addMember, middleware.response);
routes.delete('/v1/member/:id', base.delMember, middleware.response);
routes.get('/v1/member/:id', base.getHistory, middleware.response);


module.exports = routes;