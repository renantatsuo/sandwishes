import React from 'react'
import { render } from '@testing-library/react'
import ReceiptItem from './index'

describe('Test Ingredient component', () => {
  it('Should render values', () => {
    const props = {
      text: 'Test',
      price: 1
    }
    const { container } = render(<ReceiptItem {...props} />)

    expect(
      container.querySelector('.receipt__item__price').textContent
    ).toMatch('R$ 1,00')
    expect(container.querySelector('.receipt__item__desc').textContent).toMatch(
      'Test'
    )
    expect(container).toMatchSnapshot()
  })
})
