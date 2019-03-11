import axios from 'axios'
import {
  calculatePrice,
  convertFloatToMoney,
  fetchIngredients,
  fetchSandwiches
} from './Helpers'

jest.mock('axios')

const MockIngredients = [
  { id: 0, name: 'Alface', price: 0.4 },

  { id: 1, name: 'Bacon', price: 2.0 },

  { id: 2, name: 'Hambúrguer de carne', price: 3.0 },

  { id: 3, name: 'Ovo', price: 0.8 },

  { id: 4, name: 'Queijo', price: 1.5 }
]

describe('calculatePrice', () => {
  it('Should return zero', () => {
    expect(calculatePrice([], MockIngredients)).toEqual(0)
    expect(calculatePrice([1, 2, 3], [])).toEqual(0)
    expect(calculatePrice([], [])).toEqual(0)
  })

  it('Should return 5.8', () => {
    expect(calculatePrice([1, 2, 3], MockIngredients)).toEqual(5.8)
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
