import React, { useState, useEffect } from 'react'

import { fetchIngredients, fetchSandwiches } from '../../helpers'
import Ingredient from '../../Components/Ingredient/index'
import Burger from '../../Assets/burger.svg'
import './Order.scss'
import Receipt from '../../Components/Receipt/index'

const Order = ({ match: { params: { id } } = { params: { id: false } } }) => {
  const [ingredients, setIngredients] = useState([])
  const [sandwich, setSandwich] = useState({})
  const [recipe, setRecipe] = useState([])

  useEffect(() => {
    Promise.all([fetchIngredients(), fetchSandwiches()]).then(
      ([ingredients, sandwiches]) => {
        if (id) {
          const currentSandwich = sandwiches.filter(
            (_sandwich) => Number(_sandwich.id) === Number(id)
          )[0]

          setSandwich(currentSandwich)
          setRecipe(currentSandwich.recipe)
        }

        setIngredients(ingredients)
      }
    )
  }, [])

  const handleAddIngredient = (ingredient) => setRecipe([...recipe, ingredient])

  const handleRemoveIngredient = (ingredient) => {
    const filteredRecipe = recipe.filter((e) => e !== ingredient)
    const newIngredients = recipe.filter((e) => e === ingredient).slice(0, -1)

    setRecipe([...filteredRecipe, ...newIngredients])
  }

  const mapIngredients = (ingredients = [], recipe = []) => {
    if (ingredients.length < 1) {
      return false
    }

    return ingredients.map((ingredient) => (
      <Ingredient
        addIngredient={handleAddIngredient}
        id={ingredient.id}
        key={ingredient.id}
        photo={Burger}
        price={ingredient.price}
        removeIngredient={handleRemoveIngredient}
        title={ingredient.name}
        quantity={
          recipe.filter((e) => Number(e) === Number(ingredient.id)).length
        }
      />
    ))
  }

  return (
    <>
      <div className="order__cart">
        <Receipt recipe={recipe} ingredients={ingredients} />
      </div>
      <div>
        <h1>{(sandwich && sandwich.name) || 'Ingredientes'}</h1>
        {!sandwich
          ? mapIngredients(ingredients)
          : mapIngredients(ingredients, sandwich.recipe)}
      </div>
    </>
  )
}

export default Order
