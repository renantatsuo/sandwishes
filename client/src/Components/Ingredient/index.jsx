import React, { useState, useEffect } from 'react'
import { Add, Remove } from '@material-ui/icons'

import { convertFloatToMoney } from '../../helpers'
import './Ingredient.scss'

const Ingredient = ({
  addIngredient,
  id,
  photo,
  price,
  removeIngredient,
  quantity,
  title
}) => {
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
    <div className="ingredient">
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
        {counter === 0 ? (
          <button type="button" disabled>
            <Remove />
          </button>
        ) : (
          <button type="button" onClick={handleRemove}>
            <Remove />
          </button>
        )}
        {counter}
        <button type="button" onClick={handleAdd}>
          <Add />
        </button>
      </div>
    </div>
  )
}

export default Ingredient
