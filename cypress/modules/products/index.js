export function navigateToProductsPage() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.get('.features_items h2.title').should('be.visible').and('have.text', 'All Products')
}

export function viewProduct() {
    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .first()
        .should('be.visible')
    cy.get('.features_items .product-image-wrapper').first().contains('a', 'View Product').click()
}

export function verifyProductDetailPage() {
    cy.url().should('match', /\/product_details\/\d+$/)
    cy.get('.product-information').within(() => {
        cy.get('h2').should('be.visible').invoke('text').should('not.be.empty')
        cy.contains('p', 'Category:').should('be.visible')
        cy.contains('span', /Rs\.\s*\d+/).should('be.visible')
        cy.contains('p', 'Availability:').should('be.visible')
        cy.contains('p', 'Condition:').should('be.visible')
        cy.contains('p', 'Brand:').should('be.visible')
    })
}

export function searchProduct(searchTerm) {
    cy.get('#search_product').type(searchTerm)
    cy.get('#submit_search').click()    
}

export function verifySearchResults(searchTerm) {
    cy.url().should('include', `/products?search=${searchTerm}`)
    cy.get('.features_items h2.title').should('be.visible').and('have.text', 'Searched Products')
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)
      .then(($products) => {
        const productNames = $products.toArray().map(($product) =>
          $product.querySelector('.productinfo p').textContent.trim().toLowerCase(),
        )

        expect(productNames.some((name) => name.includes(searchTerm.toLowerCase()))).to.be.true
        $products.each((index, product) => {
          expect(Cypress.dom.isVisible(product), `produto ${index + 1} visível`).to.be.true
        })
      })
}
