const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		productName: String,
		description: String,
		price: Number,
		totalCount: Number,
		distribution: [
			{
				branchId: { type: Schema.ObjectId, ref: "Branch" },
				count: Number
			}
		]
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Product", ProductSchema);
