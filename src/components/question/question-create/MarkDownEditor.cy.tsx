import React from 'react'
import { MarkDownEditor } from './MarkDownEditor'

describe('<MarkDownEditor />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MarkDownEditor />)
  })
})