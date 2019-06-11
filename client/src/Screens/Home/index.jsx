import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Burger from '../../Assets/burger.svg'
import MenuItem from '../../Components/MenuItem/index'
import {
  calculateBasePrice,
  fetchSandwiches,
  fetchIngredients
} from '../../helpers'
import './Home.scss'

const mapSandwiches = (sandwiches) => {
  return sandwiches.map((sandwich) => (
    <MenuItem
      desc={sandwich.description}
      key={sandwich.id}
      photo={sandwich.photo}
      price={sandwich.price}
      title={sandwich.name}
      to={`/order/${sandwich.id}`}
    />
  ))
}

const Home = () => {
  const [sandwiches, setSandwiches] = useState([])

  useEffect(() => {
    Promise.all([fetchSandwiches(), fetchIngredients()]).then(
      ([sandwichList, ingredients]) => {
        setSandwiches(
          sandwichList.map((sandwich) => ({
            ...sandwich,
            photo: Burger,
            price: calculateBasePrice(sandwich.recipe, ingredients)
          }))
        )
      }
    )
  }, [])

  return (
    <>
      <div className="home__diy">
        <Link to="/order" className="home__diy__button">
          Monte você mesmo
        </Link>
      </div>
      <div className="home__menu">
        <h1>Escolher no cardápio</h1>
        {mapSandwiches(sandwiches)}
      </div>
    </>
  )
}

export default Home
