import {
  calculateBasePrice,
  convertFloatToMoney,
  fetchIngredients,
  fetchSandwiches,
  getPromotionDiscount,
} from './helpers'
import Http from './Lib/Http'

jest.mock('./Lib/Http')

const MockIngredients = [
  { id: 0, name: 'Alface', price: 1 },

  { id: 1, name: 'Bacon', price: 1 },

  { id: 2, name: 'Hambúrguer de carne', price: 1 },

  { id: 3, name: 'Ovo', price: 1 },

  { id: 4, name: 'Queijo', price: 1 },
]

describe('getPromotionDiscount', () => {
  it('Should return zero', () => {
    expect(getPromotionDiscount(0, [0, 1, 2, 3, 4], MockIngredients)).toEqual(0)
    expect(getPromotionDiscount(0, [], MockIngredients)).toEqual(0)
    expect(getPromotionDiscount(0, [0, 1, 2, 3, 4], [])).toEqual(0)
  })

  it('Should return 10%', () => {
    const recipe = [0, 2, 3, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBeCloseTo(0.4)
  })

  it('Should return -1 hamburger', () => {
    const recipe = [1, 2, 2, 2, 3, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(1)
  })

  it('Should return -1 cheese', () => {
    const recipe = [1, 2, 3, 4, 4, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(1)
  })

  it('Should return -2 hamburger', () => {
    const recipe = [1, 2, 2, 2, 2, 2, 2, 2, 3, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(2)
  })

  it('Should return -2 cheese', () => {
    const recipe = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(2)
  })

  it('Should return -1 cheese -10%', () => {
    const recipe = [0, 2, 3, 4, 4, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(1.6)
  })

  it('Should return -1 cheese -1 hamburger -10%', () => {
    const recipe = [0, 2, 2, 2, 3, 4, 4, 4]
    const basePrice = calculateBasePrice(recipe, MockIngredients)
    const discount = getPromotionDiscount(basePrice, recipe, MockIngredients)

    expect(discount).toBe(2.8)
  })
})

describe('calculateBasePrice', () => {
  it('Should return zero', () => {
    expect(calculateBasePrice([], MockIngredients)).toEqual(0)
    expect(calculateBasePrice([1, 2, 3], [])).toEqual(0)
    expect(calculateBasePrice([], [])).toEqual(0)
  })

  it('Should return 3', () => {
    expect(calculateBasePrice([1, 2, 3], MockIngredients)).toEqual(3)
  })
})

describe('convertFloatToMoney', () => {
  it('Should return 0,00', () => {
    expect(convertFloatToMoney(0)).toEqual('0,00')
  })

  it('Should return 0,00', () => {
    expect(convertFloatToMoney()).toEqual('0,00')
  })

  it('Should return 0,10', () => {
    expect(convertFloatToMoney(0.1)).toEqual('0,10')
  })

  it('Should return 111,11', () => {
    expect(convertFloatToMoney(111.111)).toEqual('111,11')
  })
})

describe('fetchSandwiches', () => {
  it('Should return []', () => {
    Http.get.mockResolvedValue({ data: [] })

    return fetchSandwiches().then((sandwiches) =>
      expect(sandwiches).toHaveLength(0)
    )
  })

  it('Should return 1 object', () => {
    Http.get.mockResolvedValue({ data: [{}] })

    return fetchSandwiches().then((sandwiches) => {
      expect(sandwiches).toHaveLength(1)
      expect(typeof sandwiches[0]).toBeTruthy()
    })
  })
})

describe('fetchIngredients', () => {
  it('Should return []', () => {
    Http.get.mockResolvedValue({ data: [] })

    return fetchIngredients().then((ingredients) =>
      expect(ingredients).toHaveLength(0)
    )
  })

  it('Should return 1 object', () => {
    Http.get.mockResolvedValue({ data: [{}] })

    return fetchIngredients().then((ingredients) => {
      expect(ingredients).toHaveLength(1)
      expect(typeof ingredients[0]).toBeTruthy()
    })
  })
})
