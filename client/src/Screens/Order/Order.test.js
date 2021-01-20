import React from 'react'
import { screen, act } from '@testing-library/react'
import { MockIngredients, renderWithRouter } from '../../testingHelpers'
import { useIngredients } from '../../Lib/Hooks/useIngredients'
import { useSandwiches } from '../../Lib/Hooks/useSandwiches'
import Order from './index'

jest.mock('../../Lib/Hooks/useIngredients')
jest.mock('../../Lib/Hooks/useSandwiches')

const MockSandwich = {
  id: 0,
  name: 'X-Bacon',
  description: 'Bacon, hambúrguer de carne e queijo',
  recipe: [0, 1, 2],
}

describe('Test Order Screen', () => {
  it('Should render empty with no errors', () => {
    useIngredients.mockReturnValue([])
    useSandwiches.mockReturnValue([])
    const { container } = renderWithRouter(<Order />)

    expect(container).toMatchSnapshot()
  })

  it('Should render ingredients with no recipe', async () => {
    useIngredients.mockReturnValue(MockIngredients)
    useSandwiches.mockReturnValue([])

    renderWithRouter(<Order />)

    expect(screen.getAllByRole('listitem')).toHaveLength(MockIngredients.length)
  })

  it('Should render ingredients with sandwich recipe', async () => {
    useIngredients.mockReturnValue(MockIngredients)
    useSandwiches.mockReturnValue([MockSandwich])

    renderWithRouter(<Order match={{ params: { id: '0' } }} />)

    expect(screen.getByRole('heading').textContent).toStrictEqual(
      MockSandwich.name
    )
  })
})
