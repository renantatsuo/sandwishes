import React from 'react'
import { act } from '@testing-library/react'

import Home from './index'
import { renderWithRouter } from '../../testingHelpers'

describe('Test Home Screen', () => {
  it('Should render empty with no errors', async () => {
    const response = Promise.resolve([])
    const { container } = renderWithRouter(<Home />)

    await act(async () => {
      await response
    })

    expect(container).toMatchSnapshot()
  })
})
