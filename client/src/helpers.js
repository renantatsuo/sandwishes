import Http from './Lib/Http'

const LETTUCE_ID = 0
const BACON_ID = 1
const HAMBURGER_ID = 2
const CHEESE_ID = 4

// is bacon a meat? ¯\_(ツ)_/¯
// Light discount over total or subtotal?
export const getPromotionDiscount = (
  basePrice,
  recipe = [],
  ingredients = []
) => {
  const meatDiscount = calculateMeatDiscount(recipe, ingredients)
  const cheeseDiscount = calculateCheeseDiscount(recipe, ingredients)

  const baseDiscount = meatDiscount + cheeseDiscount

  if (isLightRecipe(recipe)) {
    const lightDiscount = basePrice * 0.1
    return lightDiscount + baseDiscount
  }

  return meatDiscount + cheeseDiscount
}

export function calculateBasePrice(recipe = [], ingredients = []) {
  return recipe.reduce(sumIngredientsPrices(ingredients), 0)
}

const sumIngredientsPrices = (ingredients) => (
  sumAccumulator,
  currentIngredientId
) => {
  return sumAccumulator + getIngredientPrice(currentIngredientId, ingredients)
}

const calculateMeatDiscount = (recipe, ingredients) => {
  const countMeat = countIngredientInRecipe(HAMBURGER_ID, recipe)
  const ingredientPrice = getIngredientPrice(HAMBURGER_ID, ingredients)

  return Math.floor(countMeat / 3) * ingredientPrice
}

const calculateCheeseDiscount = (recipe, ingredients) => {
  const countCheese = countIngredientInRecipe(CHEESE_ID, recipe)
  const ingredientPrice = getIngredientPrice(CHEESE_ID, ingredients)

  return Math.floor(countCheese / 3) * ingredientPrice
}

const getIngredientPrice = (ingredientId, ingredients = []) => {
  if (ingredientId === undefined || ingredients.length === 0) {
    return 0
  }

  const ingredient = getIngredientById(ingredientId, ingredients)
  return ingredient.price
}

const getIngredientById = (ingredientId, ingredients) =>
  ingredients.find((ingredient) => ingredient.id === ingredientId)

const isLightRecipe = (recipe) => {
  const lettuceCount = countIngredientInRecipe(LETTUCE_ID, recipe)
  const baconCount = countIngredientInRecipe(BACON_ID, recipe)

  return lettuceCount > 0 && baconCount === 0
}

export const countIngredientInRecipe = (ingredient, recipe) =>
  recipe.filter((ingredientId) => ingredientId === ingredient).length

export const convertFloatToMoney = (floatNumber) => {
  if (!(typeof floatNumber === 'number')) {
    return '0,00'
  }

  return floatNumber.toFixed(2).toString().replace('.', ',')
}

export const fetchSandwiches = () =>
  Http.get('/api/sandwiches').then(({ data }) => data)

export const fetchIngredients = () =>
  Http.get('/api/ingredients').then(({ data }) => data)
