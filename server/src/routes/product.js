// src/routes/product.js
const express = require("express");
const router = express.Router();
const productControllers = require("../controller/product");

router.get("/product", productControllers.getAll);

module.exports = router;
