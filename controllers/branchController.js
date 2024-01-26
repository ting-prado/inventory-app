const Branch = require("../models/branch");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

// Display all branches
exports.branch_list = asyncHandler(async (req, res, next) => {
	Branch.find()
		.sort({ branchName: 1 })
		.then((result) => res.send(result));
});

// Get branch by I
exports.get_branch = asyncHandler(async (req, res, next) => {
	const branchId = req.params.id;
	Branch.findOne({ _id: branchId }).then((result) => res.send(result));
});

// Add branch
exports.add_branch = asyncHandler(async (req, res, next) => {
	const { branchName, location } = req.body;
	const branch = new Branch({
		branchName,
		location
	});

	branch.save().then(() => res.send("Branch created."));
});

// Edit branch
exports.edit_branch = asyncHandler(async (req, res, next) => {
	const { branchName, location } = req.body;
	Branch.updateOne(
		{ _id: req.params.id },
		{
			branchName,
			location
		}
	).then((result) => res.send("Branch edited."));
});

// Delete branch
exports.delete_branch = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	Branch.deleteOne({ _id: req.params.id }).then((result) => {
		Product.updateMany(
			{ "distribution.branchId": id },
			{
				$pull: { distribution: { branchId: id } }
			}
		).then(() => res.send("Branch deleted"));
	});
});
