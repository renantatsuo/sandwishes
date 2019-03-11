import React from 'react'
import { shallow } from 'enzyme'
import Ingredient from './index'

describe('Test Ingredient component', () => {
  it('Should render with no errors', () => {
    const menuItem = shallow(<Ingredient />)

    expect(menuItem.find('.ingredient__info--price').text()).toMatch('R$ 0,00')
    expect(menuItem).toMatchSnapshot()
  })
})
