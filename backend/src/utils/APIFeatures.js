class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(searchFields = ["title", "company", "description", "skills"]) {
    if (this.queryString.search) {
      const keyword = this.queryString.search.trim();

      const searchConditions = searchFields.map((field) => ({
        [field]: { $regex: keyword, $options: "i" },
      }));

      this.query = this.query.find({
        $or: searchConditions,
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["search", "sort", "limit", "page", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);

    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "string" && queryObj[key].includes(",")) {
        queryObj[key] = { $in: queryObj[key].split(",") };
      }
    });

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pagination() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
