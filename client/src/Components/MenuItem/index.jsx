import React from 'react'
import { Link } from 'react-router-dom'
import { AddShoppingCartOutlined } from '@material-ui/icons'

import { convertFloatToMoney } from '../../helpers'
import './MenuItem.scss'

const MenuItem = ({ desc, photo, price, title, to }) => (
  <Link to={to} className="menu_item">
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
  </Link>
)

export default MenuItem
