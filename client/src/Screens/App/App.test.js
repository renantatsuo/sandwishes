import React from 'react'
import { shallow } from 'enzyme'

import App from '.'

describe('Test App screen', () => {
  it('renders without crashing', () => {
    const app = shallow(<App />)

    expect(app.find('.app__header')).toHaveLength(1)
    expect(app).toMatchSnapshot()
  })
})
