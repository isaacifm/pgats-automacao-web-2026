export const verifyHome = () => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
  cy.title().should('eq', 'Automation Exercise')
  cy.get('#slider').should('be.visible')
  cy.get('.shop-menu a[href="/"]').should('have.attr', 'style').and('contain', 'orange')
}

export const visit = () => {
  cy.visit('/')
}

export function subscribeToNewsletter(email) {
  cy.get('#susbscribe_email').type(email)
  cy.get('#subscribe').click()
  cy.get('#success-subscribe .alert-success')
      .should('be.visible')
      .and('have.text', 'You have been successfully subscribed!')
}
