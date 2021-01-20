import Burger from '../../Assets/burger.svg'
import { calculatePrice } from '../Pricing'

export default class Sandwiches {
  #http

  constructor(http) {
    this.#http = http
    this.sandwiches = []
  }

  async getAll(ingredients) {
    const ingredientsIsEmpty = ingredients.length === 0
    if (ingredientsIsEmpty) {
      return []
    }

    try {
      const { data } = await this.#http.get('/api/sandwiches')

      return data.map(({ id, description, name, recipe }) => ({
        description,
        id,
        photo: Burger,
        price: calculatePrice(recipe, ingredients),
        name,
        recipe,
      }))
    } catch (err) {
      console.error(err)
      return []
    }
  }
}
