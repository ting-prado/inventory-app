const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BranchSchema = new Schema(
	{
		branchName: String,
		location: String
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Branch", BranchSchema);
