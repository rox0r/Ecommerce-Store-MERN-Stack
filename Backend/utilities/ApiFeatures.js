class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((v) => delete queryStrCopy[v]);

    // To filter price range
    let strQuery = JSON.stringify(queryStrCopy);
    strQuery = strQuery.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(strQuery));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resultsPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
