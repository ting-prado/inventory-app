const Branch = require("../models/branch");
const asyncHandler = require("express-async-handler");

// Display all branches
exports.branch_list = asyncHandler(async (req, res, next) => {
	Branch.find()
		.sort({ branchName: 1 })
		.then((result) => res.send(result));
});

// Add branch
exports.add_branch = asyncHandler(async (req, res, next) => {
	const { branchName, location } = req.body;
	const branch = new Branch({
		branchName,
		location
	});

	branch.save().then((result) => res.send("Branch created."));
});

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

exports.delete_branch = asyncHandler(async (req, res, next) => {
	Branch.deleteOne({ _id: req.params.id }).then((result) =>
		res.send("Branch deleted.")
	);
});
