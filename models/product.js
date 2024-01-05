const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		productName: String,
		description: String,
		price: Number
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Product", ProductSchema);
