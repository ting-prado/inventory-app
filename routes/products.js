const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");

// product ROUTES

// GET product list
router.get("/", product_controller.product_list);

// GET product by ID
router.get("/:id", product_controller.get_product);

// ADD product
router.post("/", product_controller.add_product);

// EDIT product
router.put("/:id", product_controller.edit_product);

// DELETE product
router.delete("/:id", product_controller.delete_product);

module.exports = router;
