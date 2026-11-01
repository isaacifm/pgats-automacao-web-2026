import { card } from '../data'

export const verifyDetails = (user, productIds) => {
  const fullName = `${user.title}. ${user.firstName} ${user.lastName}`
  ;['#address_delivery', '#address_invoice'].forEach((sel) => {
    cy.get(sel).within(() => {
      cy.get('.address_firstname').should('contain', fullName)
      cy.get('.address_address1').should('contain', user.company)
      cy.get('.address_address1').should('contain', user.address1)
      cy.get('.address_address1').should('contain', user.address2)
      cy.get('.address_city').should('contain', user.city).and('contain', user.state).and('contain', user.zipcode)
      cy.get('.address_country_name').should('have.text', user.country)
      cy.get('.address_phone').should('have.text', user.mobile)
    })
  })

  cy.contains('h2.heading', 'Review Your Order').should('be.visible')
  productIds.forEach((id) => cy.get(`#product-${id}`).should('be.visible'))
}

export const placeOrderAndPay = (comment) => {
  cy.get('textarea[name="message"]').type(comment)
  cy.contains('a', 'Place Order').click()
  cy.url().should('include', '/payment')

  cy.get('[data-qa="name-on-card"]').type(card.name)
  cy.get('[data-qa="card-number"]').type(card.number)
  cy.get('[data-qa="cvc"]').type(card.cvc)
  cy.get('[data-qa="expiry-month"]').type(card.month)
  cy.get('[data-qa="expiry-year"]').type(card.year)
  
  
  cy.get('#payment-form').then(($form) => {
    $form.one('submit', (e) => e.preventDefault())
  })
  cy.get('[data-qa="pay-button"]').click()
  cy.get('#success_message .alert-success')
    .should('be.visible')
    .and('contain', 'Your order has been placed successfully!')
  cy.get('#payment-form').then(($form) => $form[0].requestSubmit())

  cy.get('[data-qa="order-placed"]').should('be.visible').and('contain', 'Order Placed!')
  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}
