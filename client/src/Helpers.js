import axios from 'axios'

const LETTUCE_ID = 0
const BACON_ID = 1
const HAMBURGER_ID = 2
const CHEESE_ID = 4

export const calculatePrice = (recipe, ingredients) =>
  ingredients.length > 0
    ? recipe.reduce(
        (prev, curr) =>
          prev + ingredients.filter((e) => e.id === curr)[0].price,
        0
      )
    : 0

// is bacon a meat? ¯\_(ツ)_/¯
// Light discount over total or subtotal?
export const getPromotionDiscount = (recipe, ingredients) => {
  if (ingredients.length < 1) {
    return 0
  }

  let discount = 0
  const basePrice = calculatePrice(recipe, ingredients)
  const countMeat = recipe.filter((e) => e === HAMBURGER_ID).length
  const countCheese = recipe.filter((e) => e === CHEESE_ID).length

  if (countMeat / 3 > 0) {
    discount += Math.floor(countMeat / 3) * ingredients[HAMBURGER_ID].price
  }

  if (countCheese / 3 > 0) {
    discount += Math.floor(countCheese / 3) * ingredients[CHEESE_ID].price
  }

  if (recipe.indexOf(LETTUCE_ID) !== -1 && recipe.indexOf(BACON_ID) === -1) {
    discount += (basePrice - discount) / 10
  }

  return discount
}

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
