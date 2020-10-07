import { act } from '@testing-library/react'
import React from 'react'
import * as helpers from '../../helpers'
import { MockIngredients, renderWithRouter } from '../../testingHelpers'
import Order from './index'

const MockSandwich = {
  id: 0,
  name: 'X-Bacon',
  description: 'Bacon, hambúrguer de carne e queijo',
  recipe: [0, 1, 2],
}

describe('Test Order Screen', () => {
  it('Should render empty with no errors', () => {
    const { container } = renderWithRouter(<Order />)

    expect(container).toMatchSnapshot()
  })

  it('Should render ingredients with no recipe', async () => {
    helpers.fetchIngredients = jest.fn().mockResolvedValue(MockIngredients)
    helpers.fetchSandwiches = jest.fn().mockResolvedValue([])

    const { container } = renderWithRouter(<Order />)
    await act(() =>
      Promise.all([helpers.fetchIngredients(), helpers.fetchSandwiches()])
    )

    expect(container.querySelectorAll('.ingredient')).toHaveLength(
      MockIngredients.length
    )
  })

  it('Should render ingredients with sandwich recipe', async () => {
    helpers.fetchIngredients = jest.fn().mockResolvedValue(MockIngredients)
    helpers.fetchSandwiches = jest.fn().mockResolvedValue([MockSandwich])

    const { container } = renderWithRouter(
      <Order match={{ params: { id: '0' } }} />
    )

    await act(() =>
      Promise.all([helpers.fetchIngredients(), helpers.fetchSandwiches()])
    )

    expect(container.querySelectorAll('h1')[0].textContent).toStrictEqual(
      MockSandwich.name
    )
  })
})
