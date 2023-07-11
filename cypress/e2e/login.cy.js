describe('login test', () => {
  it('jump to register', () => {
    cy.visit('/login')
    cy.get('[id="register"]').click();
    cy.url().should("include","/sign-up")
  })
  it('pass example', () => {
    cy.visit('/login')
    cy.get('[placeholder="username"]').type("string");
    cy.get('[placeholder="password"]').type("string");
    cy.get('button').click();
    cy.url().should("include","/questions")
  })
  it('ask questions flow', () => {
    cy.visit('/login')
    cy.get('[placeholder="username"]').type("string");
    cy.get('[placeholder="password"]').type("string");
    cy.get('button').click();
    cy.url().should("include","/questions")
    cy.get('[id="ask-button"]').click();
    cy.url().should("include","/create-question");

  })

})