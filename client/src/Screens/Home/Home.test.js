import React from 'react'
import Home from './index'

import { renderWithRouter } from '../../testingHelpers'

describe('Test Home Screen', () => {
  it('Should render empty with no errors', () => {
    const { container } = renderWithRouter(<Home />)

    expect(container).toMatchSnapshot()
  })
})
