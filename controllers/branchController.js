const Branch = require("../models/branch");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

// Display all branches
exports.branch_list = asyncHandler(async (req, res, next) => {
	const result = await Branch.find().sort({ branchName: 1 });

	res.send(result);
});

// Get branch by I
exports.get_branch = asyncHandler(async (req, res, next) => {
	const branchId = req.params.id;
	const result = await Branch.findOne({ _id: branchId });

	res.send(result);
});

// Add branch
exports.add_branch = asyncHandler(async (req, res, next) => {
	const { branchName, location } = req.body;
	const branch = new Branch({
		branchName,
		location
	});

	const result = await branch.save();
	await Product.updateMany(
		{},
		{
			$push: {
				distribution: {
					branchId: result._id,
					count: 0
				}
			}
		}
	);

	res.send("Branch created");
});

// Edit branch
exports.edit_branch = asyncHandler(async (req, res, next) => {
	const { branchName, location } = req.body;
	await Branch.updateOne(
		{ _id: req.params.id },
		{
			branchName,
			location
		}
	);

	res.send("Branch edited.");
});

// Delete branch
exports.delete_branch = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	await Branch.deleteOne({ _id: req.params.id });
	await Product.updateMany(
		{ "distribution.branchId": id },
		{
			$pull: { distribution: { branchId: id } }
		}
	);

	res.send("Branch deleted");
});
