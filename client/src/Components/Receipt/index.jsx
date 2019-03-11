import React from 'react'
import { ShoppingCartOutlined } from '@material-ui/icons'

import {
  convertFloatToMoney,
  calculatePrice,
  getPromotionDiscount
} from '../../Helpers'
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
        text={`(${countIngredients}x) ${ingredientName}`}
        price={ingredientTotalPrice}
      />
    )
  })
}

const Receipt = ({ ingredients, recipe }) => {
  const subTotal = calculatePrice(recipe, ingredients)
  const promotionDiscount = getPromotionDiscount(recipe, ingredients)
  const total = subTotal - promotionDiscount
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
