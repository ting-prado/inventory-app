const Product = require("../models/product");
const Branch = require("../models/branch");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongodb").ObjectId;

// Display all products
exports.product_list = asyncHandler(async (req, res, next) => {
	const productList = await Product.aggregate([
		{
			$lookup: {
				from: "branches",
				localField: "distribution.branchId",
				foreignField: "_id",
				as: "branchDetails"
			}
		}
	]);

	const response = productList.map((product) => {
		const newData = {
			...product,
			distribution: product.distribution.map((branch, idx) => ({
				...branch,
				branchName: product.branchDetails[idx].branchName
			})),
			undistributed:
				product.totalCount -
				product.distribution.reduce((sum, i) => sum + i.count, 0)
		};

		delete newData.branchDetails;

		return newData;
	});

	res.send(response);
});

// Product by Id
exports.get_product = asyncHandler(async (req, res, next) => {
	const productId = req.params.id;
	const product = await Product.find({ _id: productId });

	res.send(product);
});

// Add product
exports.add_product = asyncHandler(async (req, res, next) => {
	const { distribution } = req.body;
	const sum = distribution.reduce((sum, i) => sum + i.count, 0);
	const branches = await Branch.find({}).exec();
	const branchIds = distribution.map((item) => item.branchId);

	const product = new Product({
		...req.body,
		distribution: distribution.concat(
			branches
				.filter((item) => !branchIds.includes(item._id.toString()))
				.map((item) => ({ branchId: item._id, count: 0 }))
		),
		totalCount: sum
	});

	await product.save();
	res.send("Product created.");
});

// Edit product
exports.edit_product = asyncHandler(async (req, res, next) => {
	const { distribution } = req.body;
	const productId = req.params.id;
	const sum = distribution.reduce((sum, i) => sum + i.count, 0);
	const branches = await Branch.find({}).exec();
	const branchIds = distribution.map((item) => item.branchId);

	await Product.findOneAndUpdate(
		{ _id: productId },
		{
			...req.body,
			totalCount: sum,
			distribution: distribution.concat(
				branches
					.filter((item) => !branchIds.includes(item._id.toString()))
					.map((item) => ({ branchId: item._id, count: 0 }))
			)
		}
	);

	res.send("Product updated");
});

// Delete product
exports.delete_product = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	await Product.deleteOne({ _id: id });

	res.send("Product deleted.");
});
