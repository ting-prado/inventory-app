const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema(
	{
		branch: { type: Schema.Types.ObjectId, ref: "Branch" },
		stocks: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				count: Number
			}
		]
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model("Inventory", InventorySchema);
