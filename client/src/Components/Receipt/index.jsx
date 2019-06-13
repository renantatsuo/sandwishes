import React, { useState, useEffect } from 'react'
import { ShoppingCartOutlined } from '@material-ui/icons'

import {
  convertFloatToMoney,
  calculateBasePrice,
  getPromotionDiscount,
  countIngredientInRecipe
} from '../../helpers'
import './Receipt.scss'
import ReceiptItem from '../ReceiptItem/index'

const mapRecipe = (recipe = [], ingredients = []) => {
  if (recipe.length < 1 || ingredients.length < 1) {
    return false
  }

  const filteredIngredients = ingredients.filter(
    (ingredient) => countIngredientInRecipe(ingredient.id, recipe) > 0
  )

  return filteredIngredients.map((ingredient) => {
    const countIngredients = countIngredientInRecipe(ingredient.id, recipe)
    const ingredientName = ingredient.name
    const ingredientTotalPrice = countIngredients * ingredient.price

    return (
      <ReceiptItem
        key={ingredient.id}
        text={`(${countIngredients}x) ${ingredientName}`}
        price={ingredientTotalPrice}
      />
    )
  })
}

const Receipt = ({ ingredients, recipe }) => {
  const [promotionDiscount, setPromotionDiscount] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    getPromotionDiscount(recipe, ingredients)
      .then(setPromotionDiscount)
      .then(() => setSubTotal(calculateBasePrice(recipe, ingredients)))
  }, [recipe, ingredients])

  return (
    <>
      <div className="receipt__info">
        {mapRecipe(recipe, ingredients)}
        {promotionDiscount ? (
          <ReceiptItem
            key={Math.random() * 1000}
            text="Promotional Discount"
            price={promotionDiscount}
            className="receipt__item--final"
          />
        ) : (
          false
        )}
      </div>
      <div className="receipt__total">
        <ShoppingCartOutlined />
        <span>R$ {convertFloatToMoney(subTotal - promotionDiscount)}</span>
      </div>
    </>
  )
}

export default Receipt
