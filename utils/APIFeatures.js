class APIFeatures {
  // api/users?sortBy=&
  // sortBy values one of [username, id, createdAt] // by default id
  // direction on of 'asc' 'desc' // by default asc
  constructor(additionalQueries, queryString) {
    this.additionalQueries = additionalQueries;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };

  }
}