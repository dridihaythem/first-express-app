class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	limitfields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}
		return this;
	}
	sort() {
		if (this.queryString.sort) {
			const sort = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sort);
		}
		return this;
	}
	paginate() {
		const page = Number(this.queryString.page) || 1;
		const limit = Number(this.queryString.limit) || 10;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
	filter() {
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		let query = JSON.stringify({ ...this.queryString });

		excludedFields.forEach((el) => delete query[el]);

		query = JSON.parse(query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`));

		this.query = this.query.find(query);

		return this;
	}
}

module.exports = APIFeatures;
