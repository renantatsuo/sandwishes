import React from 'react'
import { render, act } from '@testing-library/react'
import Ingredient from './index'

describe('Test Ingredient component', () => {
  it('Should render with no errors', () => {
    const { container } = render(<Ingredient />)

    expect(
      container.querySelector('.ingredient__info--price').textContent
    ).toMatch('R$ 0,00')
    expect(container).toMatchSnapshot()
  })

  it('Should trigger addIngredient', () => {
    const addIngredient = jest.fn()
    const { container } = render(<Ingredient addIngredient={addIngredient} />)

    act(() => {
      container.querySelectorAll('button')[1].click()
    })

    expect(addIngredient).toHaveBeenCalled()
  })

  it('Should trigger removeIngredient', () => {
    const removeIngredient = jest.fn()
    const { container } = render(
      <Ingredient removeIngredient={removeIngredient} />
    )

    act(() => {
      container.querySelectorAll('button')[0].click()
    })

    expect(removeIngredient).toHaveBeenCalled()
  })
})
