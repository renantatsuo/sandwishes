import React from 'react'
import { ShoppingCartOutlined } from '@material-ui/icons'

import { convertFloatToMoney, calculatePrice } from '../../Helpers'
import './Receipt.scss'
import ReceiptItem from '../ReceiptItem/index'

const mapRecipe = (recipe, ingredients) => {
  const filteredIngredients = ingredients.filter(
    (ingredient) => recipe.indexOf(ingredient.id) !== -1
  )

  return filteredIngredients.map((ingredient) => {
    const countIngredients = recipe.filter(
      (e) => Number(e) === Number(ingredient.id)
    ).length
    const ingredientName = ingredient.name
    const ingredientTotalPrice = countIngredients * ingredient.price

    return (
      <ReceiptItem
        key={ingredient.id}
        itemName={ingredientName}
        price={ingredientTotalPrice}
        quantity={countIngredients}
      />
    )
  })
}

const Receipt = ({ ingredients, recipe }) => {
  return (
    <>
      <div className="receipt__info">{mapRecipe(recipe, ingredients)}</div>
      <div className="receipt__total">
        <ShoppingCartOutlined />
        <span>
          R$ {convertFloatToMoney(calculatePrice(recipe, ingredients))}
        </span>
      </div>
    </>
  )
}

export default Receipt
