import React from 'react'
import { Link } from 'react-router-dom'

import MenuItem from '../../Components/MenuItem/index'
import { useSandwiches } from '../../Lib/Hooks/useSandwiches'

import './Home.scss'

const Home = () => {
  const sandwiches = useSandwiches()

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

const mapSandwiches = (sandwiches = []) => {
  if (sandwiches.length < 1) {
    return false
  }

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

export default Home
