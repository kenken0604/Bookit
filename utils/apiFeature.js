class apiFeature {
  constructor(query, queryString) {
    this.query = query //query為傳過來的Room.find() mongoose function
    this.queryString = queryString //querystring為傳過來的req.query
  }

  search() {
    const condition = this.queryString.location
      ? {
          //在address上搜尋
          address: {
            $regex: this.queryString.location,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...condition })
    // console.log(this)
    return this //返回整個物件
  }

  filter() {
    const queryCopy = { ...this.queryString }

    delete queryCopy.location //排除路由上的location做過濾
    delete queryCopy.pageNumber //排除路由上page做過濾
    // console.log(queryCopy)

    this.query = this.query.find({ ...queryCopy })
    return this
  }

  paginate(pageSize) {
    const currentPage = Number(this.queryString.pageNumber) || 1

    this.query = this.query.limit(pageSize).skip(pageSize * (currentPage - 1))
    return this
  }
}

export default apiFeature
