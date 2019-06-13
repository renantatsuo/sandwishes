import React from 'react'
import { render } from '@testing-library/react'
import Ingredient from './index'

describe('Test Ingredient component', () => {
  it('Should render with no errors', () => {
    const { container } = render(<Ingredient />)

    expect(
      container.querySelector('.ingredient__info--price').textContent
    ).toMatch('R$ 0,00')
    expect(container).toMatchSnapshot()
  })
})
