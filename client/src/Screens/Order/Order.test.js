import React from 'react'
import { waitForDomChange, render, act } from '@testing-library/react'

import Order from './index'
import { renderWithRouter } from '../../testingHelpers'
import * as helpers from '../../helpers'

const MockIngredients = [
  { id: 0, name: 'Alface', price: 1 },

  { id: 1, name: 'Bacon', price: 1 },

  { id: 2, name: 'Hambúrguer de carne', price: 1 }
]

const MockSandwich = {
  id: 0,
  name: 'X-Bacon',
  description: 'Bacon, hambúrguer de carne e queijo',
  recipe: [1, 2, 3]
}

describe('Test Order Screen', () => {
  it('Should render empty with no errors', () => {
    const { container } = renderWithRouter(<Order />)

    expect(container).toMatchSnapshot()
  })

  it('Should render ingredients with no recipe', () => {
    helpers.fetchIngredients = jest.fn().mockResolvedValue(MockIngredients)
    helpers.fetchSandwiches = jest.fn().mockResolvedValue([])

    const { container } = renderWithRouter(<Order />)
    return Promise.all([
      helpers.fetchIngredients(),
      helpers.fetchSandwiches()
    ]).then(() => {
      expect(container.querySelectorAll('.ingredient')).toHaveLength(3)
    })
  })

  it('Should render ingredients with sandwich recipe', () => {
    helpers.fetchIngredients = jest.fn().mockResolvedValue(MockIngredients)
    helpers.fetchSandwiches = jest.fn().mockResolvedValue([MockSandwich])

    const { container } = renderWithRouter(
      <Order match={{ params: { id: '0' } }} />
    )
    return Promise.all([
      helpers.fetchIngredients(),
      helpers.fetchSandwiches()
    ]).then(() => {
      expect(container.querySelectorAll('h1')[0].textContent).toStrictEqual(
        MockSandwich.name
      )
    })
  })
})
