import React from 'react'
import { convertFloatToMoney } from '../../Helpers'

const ReceiptItem = ({ itemName, price, quantity }) => {
  return (
    <div className="receipt__item">
      <div className="receipt__item__desc">{`(${quantity}x) ${itemName}`}</div>
      <div className="receipt__item__price">
        R$ {convertFloatToMoney(price)}
      </div>
    </div>
  )
}

export default ReceiptItem
