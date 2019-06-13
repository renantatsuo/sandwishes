import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'

export const renderWithRouter = (ui) => ({
  ...render(<Router>{ui}</Router>)
})
