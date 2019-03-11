import React, { Component } from 'react'

import { fetchIngredients, fetchSandwiches } from '../../Helpers'
import Ingredient from '../../Components/Ingredient/index'
import Burger from '../../Assets/burger.svg'

class Order extends Component {
  state = {
    ingredients: [],
    sandwich: {},
    recipe: []
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props

    fetchIngredients().then((ingredients) => this.setState({ ingredients }))

    if (params.id) {
      fetchSandwiches().then((sandwiches) => {
        const sandwich = sandwiches.filter(
          (_sandwich) => Number(_sandwich.id) === Number(params.id)
        )[0]
        this.setState({ sandwich, recipe: sandwich.recipe })
      })
    }
  }

  handleAddIngredient = (ingredient) => {
    const { recipe } = this.state
    this.setState({ recipe: [...recipe, ingredient] })
  }

  handleRemoveIngredient = (ingredient) => {
    const { recipe } = this.state
    const filteredRecipe = recipe.filter((e) => e !== ingredient)
    const newIngredients = recipe.filter((e) => e === ingredient).slice(0, -1)
    this.setState({ recipe: [...filteredRecipe, ...newIngredients] })
  }

  mapIngredients = (ingredients, recipe = []) =>
    ingredients.map((ingredient) => (
      <Ingredient
        addIngredient={this.handleAddIngredient}
        id={ingredient.id}
        key={ingredient.id}
        photo={Burger}
        price={ingredient.price}
        removeIngredient={this.handleRemoveIngredient}
        title={ingredient.name}
        quantity={
          recipe.filter((e) => Number(e) === Number(ingredient.id)).length
        }
      />
    ))

  render() {
    const { ingredients, sandwich } = this.state

    return (
      <div>
        <h1>{sandwich.name || 'Ingredientes'}</h1>
        {!sandwich
          ? this.mapIngredients(ingredients)
          : this.mapIngredients(ingredients, sandwich.recipe)}
      </div>
    )
  }
}

export default Order
