import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.scss'
import Logo from '../../Assets/logo.svg'
import Home from '../Home/index'
import Order from '../Order'
import { IngredientsProvider } from '../../Lib/Hooks/useIngredients'
import { SandwichesProvider } from '../../Lib/Hooks/useSandwiches'

const App = () => {
  return (
    <Router>
      <div className="app__card">
        <div className="app__header">
          <img src={Logo} alt="Sand Wishes Logo" />
        </div>
        <div className="app__content">
          <IngredientsProvider>
            <SandwichesProvider>
              <Route exact path="/" component={Home} />
              <Route exact path="/order" component={Order} />
              <Route path="/order/:id" component={Order} />
            </SandwichesProvider>
          </IngredientsProvider>
        </div>
      </div>
    </Router>
  )
}

export default App
