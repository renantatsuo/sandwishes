import React from 'react'
import { renderWithRouter } from '../../testingHelpers'
import MenuItem from './index'

describe('Test MenuItem component', () => {
  it('Should render with no errors', () => {
    const { container } = renderWithRouter(<MenuItem to="/" />)

    expect(
      container.querySelector('.menu_item__info--price').textContent
    ).toEqual('R$ 0,00')
    expect(container).toMatchSnapshot()
  })
})
