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

const mapRecipe = (recipe, ingredients) => {
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
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getPromotionDiscount(recipe, ingredients)
      .then(setPromotionDiscount)
      .then(() => setSubTotal(calculateBasePrice(recipe, ingredients)))
  }, [recipe])

  useEffect(() => {
    setTotal(subTotal - promotionDiscount)
  }, [subTotal])

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
          ''
        )}
      </div>
      <div className="receipt__total">
        <ShoppingCartOutlined />
        <span>R$ {convertFloatToMoney(total)}</span>
      </div>
    </>
  )
}

export default Receipt
