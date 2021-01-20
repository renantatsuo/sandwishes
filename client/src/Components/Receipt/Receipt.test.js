import { render } from '@testing-library/react'
import React from 'react'
import * as Pricing from '../../Lib/Pricing'
import { MockIngredients } from '../../testingHelpers'
import Receipt from './index'

const MockRecipe = [0, 1, 2]

const MockRecipeWithDiscount = [0, 2]

describe('Test Receipt component', () => {
  it('Should render empty with no errors', () => {
    const { container } = render(<Receipt />)

    expect(container).toMatchSnapshot()
  })

  it('Should render with values', () => {
    Pricing.getPromotionDiscount = jest.fn().mockReturnValue(0)
    Pricing.calculateBasePrice = jest.fn().mockReturnValue(1)
    const { container } = render(
      <Receipt ingredients={MockIngredients} recipe={MockRecipe} />
    )

    expect(container.querySelectorAll('.receipt__item')).toHaveLength(3)
  })

  it('Should render with discount', async () => {
    Pricing.getPromotionDiscount = jest.fn().mockReturnValue(1)
    Pricing.calculateBasePrice = jest.fn().mockReturnValue(1)

    const { container } = render(
      <Receipt ingredients={MockIngredients} recipe={MockRecipeWithDiscount} />
    )
    expect(container.querySelectorAll('.receipt__item')).toHaveLength(3)
    expect(container.querySelectorAll('.receipt__item--final')).toHaveLength(1)
  })
})
