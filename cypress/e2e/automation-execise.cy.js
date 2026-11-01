import { registerUser, fillUserDetails, verifyAccountCreation, deleteAccount, loginUser, logoutUser, verifyLoginError } from "../modules/register/index.js"

describe("Automation Exercise Test Suite", () => {

    let timestamp = new Date().getTime();
    let email = `autpgatstests${timestamp}@example.com`;
    let name = `autpgats tests${timestamp}`;

    it("Test Case 1: Register User" , () => {
        cy.visit("https://automationexercise.com/")

        registerUser(name, email)
        fillUserDetails()
        verifyAccountCreation()
        deleteAccount()
    })

    it("Test Case 2: Login User with correct email and password", () => {
        cy.visit("https://automationexercise.com/")

        loginUser('autpgatstests1791032199075@example.com', '12345678')
        cy.get('b').should("contain.text", "autpgats tests")
    })

    it("Test Case 3: Login User with incorrect email and password", () => {
        cy.visit("https://automationexercise.com/")
        loginUser('j5iJH@example.com', 'wrongpassword')
        verifyLoginError()
    })

    it("Test Case 4: Logout User", () => {
        cy.visit("https://automationexercise.com/")
        loginUser('autpgatstests1791032199075@example.com', '12345678')
        logoutUser()
    })

    it("Test Case 5: Register User with existing email", () => {
        cy.visit("https://automationexercise.com/")
        registerUser('autpgats tests', 'autpgatstests1791032199075@example.com')
        cy.get('p').should("contain.text", "Email Address already exist!")
    })
}) 


