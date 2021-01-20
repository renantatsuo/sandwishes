import React, { useState } from 'react'

import Ingredient from '../../Components/Ingredient/index'
import Burger from '../../Assets/burger.svg'
import './Order.scss'
import Receipt from '../../Components/Receipt/index'
import { useIngredients } from '../../Lib/Hooks/useIngredients'
import { useSandwiches } from '../../Lib/Hooks/useSandwiches'

const Order = ({ match: { params: { id } } = { params: { id: false } } }) => {
  const ingredients = useIngredients()
  const sandwiches = useSandwiches()
  const sandwich = sandwiches?.find(
    ({ id: sandwichId }) => sandwichId === Number(id)
  )
  const [recipe, setRecipe] = useState([])

  React.useEffect(() => {
    setRecipe(sandwich?.recipe)
  }, [sandwich])

  const handleAddIngredient = (ingredient) => setRecipe([...recipe, ingredient])

  const handleRemoveIngredient = (ingredient) => {
    const filteredRecipe = recipe.filter((e) => e !== ingredient)
    const newIngredients = recipe.filter((e) => e === ingredient).slice(0, -1)

    setRecipe([...filteredRecipe, ...newIngredients])
  }

  return (
    <>
      <div className="order__cart">
        <Receipt recipe={recipe} ingredients={ingredients} />
      </div>
      <div role="list">
        <h1>{sandwich?.name || 'Ingredientes'}</h1>
        {ingredients?.map((ingredient) => (
          <Ingredient
            addIngredient={handleAddIngredient}
            id={ingredient.id}
            key={ingredient.id}
            photo={Burger}
            price={ingredient.price}
            removeIngredient={handleRemoveIngredient}
            title={ingredient.name}
            quantity={getIngredientFromRecipe(ingredient.id, recipe)}
          />
        ))}
      </div>
    </>
  )
}

function getIngredientFromRecipe(ingredientId, recipe) {
  if (!recipe) {
    return 0
  }
  return recipe.filter((ingredient) => ingredient === ingredientId).length
}

export default Order
