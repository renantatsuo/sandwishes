import { render } from '@testing-library/react'
import React from 'react'
import * as helpers from '../../helpers'
import Receipt from './index'

const MockIngredients = [
  { id: 0, name: 'Alface', price: 1 },

  { id: 1, name: 'Bacon', price: 1 },

  { id: 2, name: 'Hambúrguer de carne', price: 1 },
]

const MockRecipe = [0, 1, 2]

const MockRecipeWithDiscount = [0, 2]

describe('Test Receipt component', () => {
  it('Should render empty with no errors', () => {
    const { container } = render(<Receipt />)

    expect(container).toMatchSnapshot()
  })

  it('Should render with values', () => {
    helpers.getPromotionDiscount = jest.fn().mockReturnValue(0)
    helpers.calculateBasePrice = jest.fn().mockReturnValue(1)
    const { container } = render(
      <Receipt ingredients={MockIngredients} recipe={MockRecipe} />
    )

    expect(container.querySelectorAll('.receipt__item')).toHaveLength(3)
  })

  it('Should render with discount', async () => {
    helpers.getPromotionDiscount = jest.fn().mockReturnValue(1)
    helpers.calculateBasePrice = jest.fn().mockReturnValue(1)

    const { container } = render(
      <Receipt ingredients={MockIngredients} recipe={MockRecipeWithDiscount} />
    )
    expect(container.querySelectorAll('.receipt__item')).toHaveLength(3)
    expect(container.querySelectorAll('.receipt__item--final')).toHaveLength(1)
  })
})
