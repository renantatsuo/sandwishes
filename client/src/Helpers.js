export const calculatePrice = (recipe, ingredients) =>
  recipe.reduce(
    (prev, curr) => prev + ingredients.filter((e) => e.id === curr)[0].price,
    0
  )

export const convertFloatToMoney = (floatNumber) =>
  floatNumber
    .toFixed(2)
    .toString()
    .replace('.', ',')
