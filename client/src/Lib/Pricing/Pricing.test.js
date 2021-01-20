import {
  calculatePrice,
  calculateBasePrice,
  getPromotionDiscount,
  convertFloatToMoney,
} from './index'
import { MockIngredients } from '../../testingHelpers'

describe('Default Methods', () => {
  it('Should return zero', () => {
    expect(calculatePrice()).toEqual(0)
    expect(calculateBasePrice()).toEqual(0)
    expect(getPromotionDiscount()).toEqual(0)
  })
})

describe('calculatePrice', () => {
  it('Should return zero', () => {
    expect(calculatePrice([], MockIngredients)).toEqual(0)
    expect(calculatePrice([0, 1, 2, 3, 4], [])).toEqual(0)
  })

  it('Should return 10%', () => {
    const recipe = [0, 2, 3, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBeCloseTo(3.6)
  })

  it('Should return -1 hamburger', () => {
    const recipe = [1, 2, 2, 2, 3, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(5)
  })

  it('Should return -1 cheese', () => {
    const recipe = [1, 2, 3, 4, 4, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(5)
  })

  it('Should return -2 hamburger', () => {
    const recipe = [1, 2, 2, 2, 2, 2, 2, 2, 3, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(8)
  })

  it('Should return -2 cheese', () => {
    const recipe = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(8)
  })

  it('Should return -1 cheese -10%', () => {
    const recipe = [0, 2, 3, 4, 4, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(4.4)
  })

  it('Should return -1 cheese -1 hamburger -10%', () => {
    const recipe = [0, 2, 2, 2, 3, 4, 4, 4]
    const discount = calculatePrice(recipe, MockIngredients)

    expect(discount).toBe(5.2)
  })
})

describe('calculateBasePrice', () => {
  it('Should return zero', () => {
    expect(calculateBasePrice([], MockIngredients)).toEqual(0)
    expect(calculateBasePrice([1, 2, 3], [])).toEqual(0)
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
