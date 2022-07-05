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
}

module.exports = APIFeatures;
