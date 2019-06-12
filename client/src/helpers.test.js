import axios from 'axios'
import {
  getPromotionDiscount,
  calculateBasePrice,
  convertFloatToMoney,
  fetchIngredients,
  fetchSandwiches
} from './helpers'

jest.mock('axios')

const MockIngredients = [
  { id: 0, name: 'Alface', price: 1 },

  { id: 1, name: 'Bacon', price: 1 },

  { id: 2, name: 'Hambúrguer de carne', price: 1 },

  { id: 3, name: 'Ovo', price: 1 },

  { id: 4, name: 'Queijo', price: 1 }
]

describe('getPromotionDiscount', () => {
  it('Should return zero', async () => {
    expect(
      await getPromotionDiscount([0, 1, 2, 3, 4], MockIngredients)
    ).toEqual(0)
    expect(await getPromotionDiscount([], MockIngredients)).toEqual(0)
    expect(await getPromotionDiscount([0, 1, 2, 3, 4], [])).toEqual(0)
  })

  it('Should return 10%', async () => {
    expect(
      await getPromotionDiscount([0, 2, 3, 4], MockIngredients)
    ).toBeCloseTo(0.4)
  })

  it('Should return -1 hamburger', async () => {
    expect(
      await getPromotionDiscount([1, 2, 2, 2, 3, 4], MockIngredients)
    ).toBe(1)
  })

  it('Should return -1 cheese', async () => {
    expect(
      await getPromotionDiscount([1, 2, 3, 4, 4, 4], MockIngredients)
    ).toBe(1)
  })

  it('Should return -2 hamburger', async () => {
    expect(
      await getPromotionDiscount(
        [1, 2, 2, 2, 2, 2, 2, 2, 3, 4],
        MockIngredients
      )
    ).toBe(2)
  })

  it('Should return -2 cheese', async () => {
    expect(
      await getPromotionDiscount(
        [1, 2, 3, 4, 4, 4, 4, 4, 4, 4],
        MockIngredients
      )
    ).toBe(2)
  })

  it('Should return -1 cheese -10%', async () => {
    expect(
      await getPromotionDiscount([0, 2, 3, 4, 4, 4], MockIngredients)
    ).toBe(1.5)
  })

  it('Should return -1 cheese -1 hamburger -10%', async () => {
    expect(
      await getPromotionDiscount([0, 2, 2, 2, 3, 4, 4, 4], MockIngredients)
    ).toBe(2.6)
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
    axios.get.mockResolvedValue({ data: [] })

    return fetchSandwiches().then((sandwiches) =>
      expect(sandwiches).toHaveLength(0)
    )
  })

  it('Should return 1 object', () => {
    axios.get.mockResolvedValue({ data: [{}] })

    return fetchSandwiches().then((sandwiches) => {
      expect(sandwiches).toHaveLength(1)
      expect(typeof sandwiches[0]).toBeTruthy()
    })
  })
})

describe('fetchIngredients', () => {
  it('Should return []', () => {
    axios.get.mockResolvedValue({ data: [] })

    return fetchIngredients().then((ingredients) =>
      expect(ingredients).toHaveLength(0)
    )
  })

  it('Should return 1 object', () => {
    axios.get.mockResolvedValue({ data: [{}] })

    return fetchIngredients().then((ingredients) => {
      expect(ingredients).toHaveLength(1)
      expect(typeof ingredients[0]).toBeTruthy()
    })
  })
})
