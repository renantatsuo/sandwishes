import React from 'react'
import { render } from '@testing-library/react'

import App from '.'

describe('Test App screen', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)

    expect(container.querySelectorAll('.app__header')).toHaveLength(1)
    expect(container).toMatchSnapshot()
  })
})
