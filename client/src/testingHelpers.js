import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

export const renderWithRouter = (ui) => ({
  ...render(<Router>{ui}</Router>),
})

export const MockIngredients = [
  { id: 0, name: 'Alface', price: 1 },
  { id: 1, name: 'Bacon', price: 1 },
  { id: 2, name: 'Hambúrguer de carne', price: 1 },
  { id: 3, name: 'Ovo', price: 1 },
  { id: 4, name: 'Queijo', price: 1 },
]
