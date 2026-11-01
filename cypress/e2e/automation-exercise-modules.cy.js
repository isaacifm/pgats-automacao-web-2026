import { registerUser, fillUserDetails, verifyAccountCreation, verifyHomePage, deleteAccount, loginUser, logoutUser, verifyLoginError, verifyExistingEmailError } from "../modules/register/index.js"
import { visit, verifyHome, subscribeToNewsletter } from "../modules/home/index.js"
import { buildUser } from "../modules/data/index.js"
import { navigateToProductsPage, viewProduct, verifyProductDetailPage, searchProduct, verifySearchResults } from "../modules/products/index.js"
import { addProducts, openAndVerify, verifyCartPage } from "../modules/cart/index.js"
import { verifyDetails, placeOrderAndPay } from "../modules/checkout/index.js"
import { createUserViaApi, deleteUserViaApi } from "../modules/api/index.js"


describe("Automation Exercise Test Suite", () => {
    let user

    beforeEach(() => {
        user = buildUser()
    })

    // Garante a limpeza mesmo quando o teste falha no meio; não falha se a conta não existir
    afterEach(() => {
        deleteUserViaApi(user)
    })

    it("Test Case 1: Register User" , () => {
        visit()
        verifyHome()
        registerUser(user)
        fillUserDetails(user)
        verifyAccountCreation()
        verifyHomePage(user.name)
        deleteAccount()
    })

    it("Test Case 2: Login User with correct email and password", () => {
        createUserViaApi(user)
        visit()
        loginUser(user.email, user.password)
        verifyHomePage(user.name)
    })

    it("Test Case 3: Login User with incorrect email and password", () => {
        visit()
        loginUser(user.email, 'wrongpassword')
        verifyLoginError()
    })

    it("Test Case 4: Logout User", () => {
        createUserViaApi(user)
        visit()
        loginUser(user.email, user.password)
        verifyHomePage(user.name)
        logoutUser()
    })

    it("Test Case 5: Register User with existing email", () => {
        createUserViaApi(user)
        visit()
        registerUser(user)
        verifyExistingEmailError()
    })

    it("Test Case 8: Verify All Products and product detail page", () => {
        visit()
        navigateToProductsPage()
        viewProduct()
        verifyProductDetailPage()
    })

    it("Test Case 9: Search Product", () => {
        const searchTerm = "Tshirt"
        visit()
        navigateToProductsPage()
        searchProduct(searchTerm)
        verifySearchResults(searchTerm)
    })

    it("Test Case 10: Verify Subscription in home page", () => {
        visit()
        cy.get('#footer').scrollIntoView()
        cy.get('#footer .single-widget h2').should('be.visible').and('have.text', 'Subscription')
        subscribeToNewsletter(user.email)
    })

    it("Test Case 15: Place Order: Register before Checkout", () => {
        const productIds = [1, 2]
        visit()
        registerUser(user)
        fillUserDetails(user)
        verifyAccountCreation()
        verifyHomePage(user.name)
        addProducts(productIds)
        openAndVerify(productIds)
        verifyCartPage()
        verifyDetails(user, productIds)
        placeOrderAndPay('Pedido de teste automatizado – TC15')
        deleteAccount()
    })

    it("Test Case 16: Place Order: Login before Checkout", () => {
        const productIds = [1, 3]
        createUserViaApi(user)
        visit()
        loginUser(user.email, user.password)
        verifyHomePage(user.name)
        addProducts(productIds)
        openAndVerify(productIds)
        verifyCartPage()
        verifyDetails(user, productIds)
        placeOrderAndPay('Pedido de teste automatizado – TC16')
        deleteAccount()
    })
})
