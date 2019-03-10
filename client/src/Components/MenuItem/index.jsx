import React from 'react'
import { AddShoppingCartOutlined } from '@material-ui/icons'

import { convertFloatToMoney } from '../../Helpers'
import './MenuItem.scss'

const MenuItem = ({ photo, title, desc, price }) => (
  <div className="menu_item">
    <div className="menu_item--photo">
      <img src={photo} alt={title} />
    </div>
    <div className="menu_item--info">
      <div className="menu_item--info__title">{title}</div>
      <div className="menu_item--info__desc">{desc}</div>
      <div className="menu_item--info__price">
        R$ {convertFloatToMoney(price)}
      </div>
    </div>
    <div className="menu_item--cart">
      <AddShoppingCartOutlined />
    </div>
  </div>
)

export default MenuItem
