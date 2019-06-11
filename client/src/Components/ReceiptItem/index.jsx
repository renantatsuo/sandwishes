import React from 'react'
import { convertFloatToMoney } from '../../helpers'

const ReceiptItem = ({ className, price, text }) => {
  return (
    <div className={`receipt__item ${className}`}>
      <div className="receipt__item__desc">{text}</div>
      <div className="receipt__item__price">
        R$ {convertFloatToMoney(price)}
      </div>
    </div>
  )
}

export default ReceiptItem
