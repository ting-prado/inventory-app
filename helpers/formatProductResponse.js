const formatProductResponse = (data) =>
	data.map((product) => {
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

module.exports = formatProductResponse;
