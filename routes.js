const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController')

//Home routes
route.get('/', homeController.index);

//Login routes
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Contact routes
route.get('/contact/index', contactController.index);
route.post('/contact/register', contactController.register);
route.get('/contact/index/:id', contactController.editIndex);

module.exports = route;