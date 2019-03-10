import React from 'react'
import { shallow } from 'enzyme'
import MenuItem from './index'

describe('Test MenuItem component', () => {
  it('Should render with no errors', () => {
    const menuItem = shallow(<MenuItem />)

    expect(menuItem.find('.menu_item__info--price').text()).toEqual('R$ 0,00')
    expect(menuItem).toMatchSnapshot()
  })
})
