import React from 'react'
import { shallow } from 'enzyme'
import ReceiptItem from './index'

describe('Test Ingredient component', () => {
  it('Should render values', () => {
    const props = {
      text: 'Test',
      price: 1
    }
    const receiptItem = shallow(<ReceiptItem {...props} />)

    expect(receiptItem.find('.receipt__item__price').text()).toMatch('R$ 1,00')
    expect(receiptItem.find('.receipt__item__desc').text()).toMatch('Test')
    expect(receiptItem).toMatchSnapshot()
  })
})
