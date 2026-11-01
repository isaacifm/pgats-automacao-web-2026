export const addProducts = (productIds) => {
  productIds.forEach((id) => {
    cy.get(`.features_items .productinfo a.add-to-cart[data-product-id="${id}"]`).click()
    cy.get('#cartModal').should('be.visible').and('contain', 'Your product has been added to cart.')
    cy.get('#cartModal button.close-modal').click()
    cy.get('#cartModal').should('not.be.visible')
  })
}

export const openAndVerify = (productIds) => {
  cy.get('.shop-menu a[href="/view_cart"]').click()
  cy.url().should('include', '/view_cart')
  cy.get('.breadcrumb li.active').should('have.text', 'Shopping Cart')
  cy.get('#cart_info_table tbody tr').should('have.length', productIds.length)
  productIds.forEach((id) => cy.get(`#product-${id}`).should('be.visible'))
}

export const verifyCartPage = () => {
    cy.contains('a.check_out', 'Proceed To Checkout').click()
    cy.url().should('include', '/checkout')
}
