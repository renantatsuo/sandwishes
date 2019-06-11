import axios from 'axios'

const LETTUCE_ID = 0
const BACON_ID = 1
const HAMBURGER_ID = 2
const CHEESE_ID = 4

export const calculateBasePrice = (recipe, ingredients = []) =>
  recipe.reduce(
    (prev, curr) => prev + ingredients.filter((e) => e.id === curr)[0].price,
    0
  )

// is bacon a meat? ¯\_(ツ)_/¯
// Light discount over total or subtotal?
export const getPromotionDiscount = (recipe, ingredients) =>
  Promise.resolve({ recipe, ingredients })
    .then(calculateMeatDiscount)
    .then(calculateCheeseDiscount)
    .then(calculateLighDiscount)
    .then(getDiscountValue)

const calculateMeatDiscount = ({ recipe, ingredients, discount = 0 }) => {
  const countMeat = countIngredientInRecipe(HAMBURGER_ID, recipe)
  const newDiscount =
    discount +
    Math.floor(countMeat / 3) * getIngredientPrice(HAMBURGER_ID, ingredients)

  return {
    recipe,
    ingredients,
    discount: newDiscount
  }
}

const calculateCheeseDiscount = ({ recipe, ingredients, discount = 0 }) => {
  const countCheese = countIngredientInRecipe(CHEESE_ID, recipe)
  const newDiscount =
    discount +
    Math.floor(countCheese / 3) * getIngredientPrice(CHEESE_ID, ingredients)

  return {
    recipe,
    ingredients,
    discount: newDiscount
  }
}

const calculateLighDiscount = ({ recipe, ingredients, discount = 0 }) => {
  const basePrice = calculateBasePrice(recipe, ingredients)
  const lettuceCount = countIngredientInRecipe(LETTUCE_ID, recipe)
  const baconCount = countIngredientInRecipe(BACON_ID, recipe)

  if (lettuceCount > 0 && baconCount === 0) {
    const newDiscount = discount + (basePrice - discount) / 10

    return {
      recipe,
      ingredients,
      discount: newDiscount
    }
  }

  return {
    recipe,
    ingredients,
    discount
  }
}

const getDiscountValue = ({ discount = 0 }) => discount

export const getIngredientPrice = (ingredientId, ingredients = []) => {
  const { price = 0 } =
    ingredients.filter((ingredient) => ingredient.id === ingredientId)[0] || {}

  return price
}

export const countIngredientInRecipe = (ingredient, recipe) =>
  recipe.filter((ingredientId) => ingredientId === ingredient).length

export const convertFloatToMoney = (floatNumber) =>
  typeof floatNumber === 'number'
    ? floatNumber
        .toFixed(2)
        .toString()
        .replace('.', ',')
    : '0,00'

export const fetchSandwiches = () =>
  axios.get('/api/sandwiches').then(({ data }) => data)

export const fetchIngredients = () =>
  axios.get('/api/ingredients').then(({ data }) => data)
