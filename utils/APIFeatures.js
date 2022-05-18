class APIFeatures {
  #whiteLists = ['']
  // api/users?profile-image=true&
  constructor(additionalQueries, queryString) {
    this.additionalQueries = additionalQueries;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };

  }
}