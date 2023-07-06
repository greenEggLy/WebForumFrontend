describe('login test', () => {
  it('pass example', () => {
    cy.visit('/login')
    cy.get('[placeholder="username"]').type("string");
    cy.get('[placeholder="password"]').type("string");
    cy.get('button').click();
    cy.url().should("include","/questions")
  })
  it('jump to register', () => {
    cy.visit('/login')
    cy.get('[text="免费注册"]').click();
    cy.url().should("include","/sign-up")
  })
})