import React from 'react'
import { render, act } from '@testing-library/react'

import App from '.'
import Ingredients from '../../Lib/Ingredients'
import Sandwiches from '../../Lib/Sandwiches'

jest.mock('../../Lib/Ingredients')
jest.mock('../../Lib/Sandwiches')

// const ingredients = Promise.resolve([])
// const sandwiches = Promise.resolve([])
const response = Promise.resolve([])

Ingredients.prototype.getAll.mockResolvedValue(response)
Sandwiches.prototype.getAll.mockResolvedValue(response)

describe('Test App screen', () => {
  it('renders without crashing', async () => {
    const { container } = render(<App />)

    await act(async () => {
      await response
    })

    expect(container.querySelectorAll('.app__header')).toHaveLength(1)
    expect(container).toMatchSnapshot()
  })
})
