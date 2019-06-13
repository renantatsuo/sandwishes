import React from 'react'
import { act } from '@testing-library/react'

import Home from './index'
import {
  fetchIngredients,
  fetchSandwiches,
  calculateBasePrice
} from '../../helpers'

import { renderWithRouter } from '../../testingHelpers'

jest.mock('../../helpers')

const mockSandwiches = [
  {
    id: 0,
    name: 'Test',
    description: 'Testing',
    recipe: [0, 1, 2]
  }
]

const mockIngredients = [
  { id: 0, name: 'test 1', price: 1.0 },

  { id: 1, name: 'test 2', price: 2.0 },

  { id: 2, name: 'test 3', price: 3.0 }
]

fetchSandwiches.mockResolvedValue(mockSandwiches)
fetchIngredients.mockResolvedValue(mockIngredients)
calculateBasePrice.mockImplementation(() => 6)

describe('Test Home Screen', () => {
  it('renders with data', () => {
    const { container } = renderWithRouter(<Home />)

    expect(container).toMatchSnapshot()
  })

  it('renders with data', () => {
    act(() => {
      const home = renderWithRouter(<Home />)
      Promise.all([fetchSandwiches(), fetchIngredients()]).then(() => {
        expect(home.container.querySelectorAll('.menu_item')).toHaveLength(1)
      })
    })
  })
})
