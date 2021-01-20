import { ShoppingCartOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import {
  calculateBasePrice,
  convertFloatToMoney,
  countIngredientInRecipe,
  getPromotionDiscount,
} from '../../Lib/Pricing'
import ReceiptItem from '../ReceiptItem/index'
import './Receipt.scss'

export default function Receipt({ ingredients, recipe }) {
  const [promotionDiscount, setPromotionDiscount] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const formattedTotalPrice = convertFloatToMoney(subTotal - promotionDiscount)
  const totalPrice = `R$ ${formattedTotalPrice}`

  useEffect(() => {
    const basePrice = calculateBasePrice(recipe, ingredients)
    const discount = getPromotionDiscount(basePrice, recipe, ingredients)

    setSubTotal(basePrice)
    setPromotionDiscount(discount)
  }, [recipe, ingredients])

  return (
    <>
      <div className="receipt__info">
        {mapRecipe(recipe, ingredients)}
        {!!promotionDiscount && (
          <ReceiptItem
            key={promotionDiscount}
            text="Promotional Discount"
            price={promotionDiscount}
            className="receipt__item--final"
          />
        )}
      </div>
      <div className="receipt__total">
        <ShoppingCartOutlined />
        <span>{totalPrice}</span>
      </div>
    </>
  )
}

const mapRecipe = (recipe = [], ingredients = []) => {
  if (recipe.length < 1 || ingredients.length < 1) {
    return false
  }
  const recipeIngredients = ingredients.filter(ingredientsInRecipe(recipe))
  return recipeIngredients.map(recipeToReceiptItem(recipe))
}

const ingredientsInRecipe = (recipe) => ({ id }) => recipe.includes(id)

const recipeToReceiptItem = (recipe) => (ingredient) => {
  const ingredientCount = countIngredientInRecipe(ingredient.id, recipe)
  const ingredientName = ingredient.name
  const ingredientTotalPrice = ingredientCount * ingredient.price

  return (
    <ReceiptItem
      key={ingredient.id}
      text={`(${ingredientCount}x) ${ingredientName}`}
      price={ingredientTotalPrice}
    />
  )
}
