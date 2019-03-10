import React, { Component } from 'react'
import axios from 'axios'

import './App.scss'
import Logo from '../../Assets/logo.svg'
import Burger from '../../Assets/burger.svg'
import MenuItem from '../../Components/MenuItem/index'
import { calculatePrice } from '../../Helpers'

class App extends Component {
  state = {
    sandwiches: []
  }

  componentWillMount() {
    axios.get('/api/sandwiches').then((response) => {
      const sandwiches = response.data

      axios.get('/api/ingredients').then((_response) => {
        const ingredients = _response.data
        this.setState({
          sandwiches: sandwiches.map((sandwich) => ({
            ...sandwich,
            price: calculatePrice(sandwich.recipe, ingredients)
          }))
        })
      })
    })
  }

  mapSandwiches = (sandwiches) => {
    return sandwiches.map((sandwich) => (
      <MenuItem
        key={sandwich.id}
        photo={Burger}
        title={sandwich.name}
        desc={sandwich.description}
        price={sandwich.price}
      />
    ))
  }

  render() {
    const { sandwiches } = this.state

    return (
      <div className="app__card">
        <div className="app__header">
          <img src={Logo} alt="Sand Wishes Logo" />
        </div>
        <div className="app__content">
          <div className="app__diy">
            <button type="button" className="app__diy__button">
              Monte você mesmo
            </button>
          </div>
          <div className="app__menu">
            <h1>Escolher no cardápio</h1>
            {this.mapSandwiches(sandwiches)}
          </div>
        </div>
      </div>
    )
  }
}

export default App
