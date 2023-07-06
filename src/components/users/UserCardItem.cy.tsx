import React from 'react'
import { UserCardItem } from './UserCardItem'

describe('<UserCardItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserCardItem />)
  })
})