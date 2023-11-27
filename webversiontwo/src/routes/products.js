const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController'); 



router.get('/',productsController.getAllProducts);
router.get('/:type', productsController.getProductByType);
router.get('/name', productsController.getProductByName);

module.exports = router;