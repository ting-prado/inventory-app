const Product = require("../models/product");
const Branch = require("../models/branch");
const asyncHandler = require("express-async-handler");

// Display all products
exports.product_list = asyncHandler(async (req, res, next) => {
	const productList = await Product.find();

	const response = productList.map((product) => ({
		...product._doc,
		undistributed:
			product.totalCount -
			product.distribution.reduce((sum, i) => sum + i.count, 0)
	}));

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

	product.save().then(() => res.send("Product created."));
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
	).then(() => res.send("Product updated"));
});

// Delete product
exports.delete_product = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	Product.deleteOne({ _id: id }).then((result) => res.send("Product deleted."));
});
