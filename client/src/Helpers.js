import axios from 'axios'

export const calculatePrice = (recipe, ingredients) =>
  ingredients.length > 0
    ? recipe.reduce(
        (prev, curr) =>
          prev + ingredients.filter((e) => e.id === curr)[0].price,
        0
      )
    : 0

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
