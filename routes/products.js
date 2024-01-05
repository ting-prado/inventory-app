const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");

// product ROUTES

// GET product list
router.get("/", product_controller.product_list);

// ADD product
router.post("/", product_controller.add_product);

// EDIT product
router.put("/:id", product_controller.edit_product);

// DELETE product
router.delete("/:id", product_controller.delete_product);

module.exports = router;
