import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { convertFloatToMoney } from '../../Lib/Pricing'
import './Ingredient.scss'

export default function Ingredient({
  addIngredient,
  id,
  photo,
  price,
  removeIngredient,
  quantity,
  title,
}) {
  const [counter, setCounter] = useState(0)

  const handleAdd = () => {
    addIngredient(id)
    setCounter(counter + 1)
  }
  const handleRemove = () => {
    removeIngredient(id)
    setCounter(counter - 1)
  }

  useEffect(() => {
    setCounter(quantity)
  }, [quantity])

  return (
    <div className="ingredient" role="listitem">
      <div className="ingredient__photo">
        <img src={photo} alt={title} />
      </div>
      <div className="ingredient__info">
        <div className="ingredient__info--title">{title}</div>
        <div className="ingredient__info--price">
          R$ {convertFloatToMoney(price)}
        </div>
      </div>
      <div className="ingredient__cart">
        <button type="button" onClick={handleRemove} disabled={counter === 0}>
          <Remove />
        </button>
        {counter}
        <button type="button" onClick={handleAdd}>
          <Add />
        </button>
      </div>
    </div>
  )
}
