const Product = require("../models/product");
const Inventory = require("../models/inventory");
const asyncHandler = require("express-async-handler");

// Display all products
exports.product_list = asyncHandler(async (req, res, next) => {
	// SEND PRODUCT LIST
});

// Add branch
exports.add_product = asyncHandler(async (req, res, next) => {
	// ADD PRODUCT
});

exports.edit_product = asyncHandler(async (req, res, next) => {
	// EDIT PRODUCT
});

exports.delete_product = asyncHandler(async (req, res, next) => {
	// DELETE PRODUCT
});
