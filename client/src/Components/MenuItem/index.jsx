import React from 'react'
import { AddShoppingCartOutlined } from '@material-ui/icons'

import { convertFloatToMoney } from '../../Helpers'
import './MenuItem.scss'

const MenuItem = ({ photo, title, desc, price }) => (
  <button type="button" className="menu_item">
    <div className="menu_item__photo">
      <img src={photo} alt={title} />
    </div>
    <div className="menu_item__info">
      <div className="menu_item__info--title">{title}</div>
      <div className="menu_item__info--desc">{desc}</div>
      <div className="menu_item__info--price">
        R$ {convertFloatToMoney(price)}
      </div>
    </div>
    <div className="menu_item__cart">
      <AddShoppingCartOutlined />
    </div>
  </button>
)

export default MenuItem
