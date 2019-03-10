import React from 'react'
import { shallow } from 'enzyme'

import App from '.'
import {
  fetchIngredients,
  fetchSandwiches,
  calculatePrice
} from '../../Helpers'

jest.mock('../../Helpers')

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
calculatePrice.mockImplementation(() => 6)

describe('Test App screen', () => {
  it('renders without crashing', () => {
    const app = shallow(<App />)

    expect(app.find('.app__diy')).toHaveLength(1)
    expect(app.find('.app__menu')).toHaveLength(1)
    expect(app).toMatchSnapshot()
  })

  it('renders with data', () => {
    const app = shallow(<App />)
    const appInstance = app.instance()

    appInstance.componentDidMount()

    return fetchSandwiches().then(() =>
      fetchIngredients().then(() => {
        expect(app.state('sandwiches').length).toBe(1)
        expect(app.state('sandwiches')[0].price).toBe(6)
      })
    )
  })
})
