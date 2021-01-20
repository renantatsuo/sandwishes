import { AddShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { convertFloatToMoney } from '../../Lib/Pricing'
import './MenuItem.scss'

export default function MenuItem({ desc, photo, price, title, to }) {
  const formattedPrice = `R$ ${convertFloatToMoney(price)}`

  return (
    <Link to={to} className="menu_item">
      <div className="menu_item__photo">
        <img src={photo} alt={title} />
      </div>
      <div className="menu_item__info">
        <div className="menu_item__info--title">{title}</div>
        <div className="menu_item__info--desc">{desc}</div>
        <div className="menu_item__info--price">{formattedPrice}</div>
      </div>
      <div className="menu_item__cart">
        <AddShoppingCartOutlined />
      </div>
    </Link>
  )
}
