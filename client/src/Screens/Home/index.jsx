import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Burger from '../../Assets/burger.svg'
import MenuItem from '../../Components/MenuItem/index'
import {
  calculatePrice,
  fetchSandwiches,
  fetchIngredients
} from '../../Helpers'
import './Home.scss'

class Home extends Component {
  state = {
    sandwiches: []
  }

  componentDidMount() {
    fetchSandwiches().then((sandwichList) => {
      fetchIngredients().then((ingredients) => {
        this.setState({
          sandwiches: sandwichList.map((sandwich) => ({
            ...sandwich,
            photo: Burger,
            price: calculatePrice(sandwich.recipe, ingredients)
          }))
        })
      })
    })
  }

  mapSandwiches = (sandwiches) => {
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

  render() {
    const { sandwiches } = this.state
    return (
      <>
        <div className="home__diy">
          <Link to="/order" className="home__diy__button">
            Monte você mesmo
          </Link>
        </div>
        <div className="home__menu">
          <h1>Escolher no cardápio</h1>
          {this.mapSandwiches(sandwiches)}
        </div>
      </>
    )
  }
}

export default Home
