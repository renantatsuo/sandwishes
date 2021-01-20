export default class Ingredients {
  #http

  constructor(http) {
    this.#http = http
  }

  async getAll() {
    try {
      const { data } = await this.#http.get('/api/ingredients')

      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }
}
