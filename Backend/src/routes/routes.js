const express = require('express');
const apiHealth = require('../controllers/apiHeath');
const { updateProducts, listProducts } = require('../controllers/products');
const { validatePrices } = require('../controllers/pricesValidation');
const routes = express();

routes.get('/', apiHealth);

routes.get('/listproducts', listProducts);
routes.post('/updateproducts', updateProducts);

routes.post('/validate', validatePrices);

module.exports = routes;