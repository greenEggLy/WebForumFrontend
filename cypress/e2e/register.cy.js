// describe('signup test', () => {
//   it('pass example', () => {
//     cy.visit('/sign-up')
//     cy.get('[id="username"]').type("111");
//     cy.get('[id="password"]').type("222");
//     cy.get('[id="password_conf"]').type("222");
//     cy.get('[id="email"]').type("111@qq.com");
//     cy.get('[id="tel"]').type("11111111222");
//     cy.get('[id="address"]').type("东川路8000号");
//     cy.get('button').click();
//   })
// })
describe('signup error', () => {
  it('not same password example', () => {
    cy.visit('../sign-up')
    cy.get('[id="username"]').type("111");
    cy.get('[id="password"]').type("222");
    cy.get('[id="password_conf"]').type("333");
    cy.get('[id="email"]').type("111@qq.com");
    cy.get('[id="password"]').type("222");
    cy.get('[id="tel"]').type("11111111222");
    cy.get('[id="address"]').type("东川路8000号");
    cy.get('button').click();
    cy.contains('请输入相同密码').should('be.visible');
  })
})