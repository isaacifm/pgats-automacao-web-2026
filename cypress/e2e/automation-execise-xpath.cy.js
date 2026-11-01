import '@cypress/xpath'

describe("Automation Exercise Test Suite with Xpath", () => {

    let timestamp = new Date().getTime();
    let email = `autpgatstests${timestamp}@example.com`;
    let name = `autpgats tests${timestamp}`;

    beforeEach(() => {

        cy.visit('/')
    })

    it("Test Case 1: Register User", () => {

        registerUser(name, email)
        fillUserDetails()
        verifyAccountCreation()
        deleteAccount()
    })

    it("Test Case 2: Login User with correct email and password", () => {

        loginUser('autpgatstests1791032199075@example.com', '12345678')
        cy.xpath('//b').should("contain.text", "autpgats tests")
    })

    it("Test Case 3: Login User with incorrect email and password", () => {

        loginUser('j5iJH@example.com', 'wrongpassword')
        verifyLoginError()
    })

    it("Test Case 4: Logout User", () => {

        loginUser('autpgatstests1791032199075@example.com', '12345678')
        logoutUser()
    })

    it("Test Case 5: Register User with existing email", () => {

        registerUser('autpgats tests', 'autpgatstests1791032199075@example.com')
        cy.xpath('//p').should("contain.text", "Email Address already exist!")
    })
})

function registerUser(name, email) {
    cy.xpath("//a[@href='/login']").click()
    cy.xpath("//input[@data-qa='signup-name']").type(name)
    cy.xpath("//input[@data-qa='signup-email']").type(email)
    cy.xpath("//button[@data-qa='signup-button']").click()
}

function fillUserDetails() {
    cy.xpath("//input[@id='id_gender1']").check({ force: true })
    cy.xpath("//input[@data-qa='password']").type("12345678")
    cy.xpath("//*[@data-qa='days']").select("1")
    cy.xpath("//*[@data-qa='months']").select("January")
    cy.xpath("//*[@data-qa='years']").select("1990")
    cy.xpath("//input[@id='newsletter']").check({ force: true })
    cy.xpath("//input[@id='optin']").check({ force: true })
    cy.xpath("//input[@data-qa='first_name']").type("autpgats example")
    cy.xpath("//input[@data-qa='last_name']").type("test")
    cy.xpath("//input[@data-qa='company']").type("autpgats")
    cy.xpath("//*[@data-qa='address']").type("Avenue 50")
    cy.xpath("//*[@data-qa='address2']").type("Avenue 55")
    cy.xpath("//*[@data-qa='country']").select("United States")
    cy.xpath("//*[@data-qa='state']").type("Texas")
    cy.xpath("//*[@data-qa='city']").type("Dallas")
    cy.xpath("//*[@data-qa='zipcode']").type("6785949")
    cy.xpath("//*[@data-qa='mobile_number']").type("9999999999")
    cy.xpath("//button[@data-qa='create-account']").click()
}

function verifyAccountCreation() {
    cy.xpath("//h2[@data-qa='account-created']").should("contain.text", "Account Created!")
    cy.xpath("//a[@data-qa='continue-button']").click()
}

function deleteAccount() {
    cy.xpath("//a[@href='/delete_account']").click()
    cy.xpath("//h2[@data-qa='account-deleted']").should("contain.text", "Account Deleted!")
}

function loginUser(email, password) {
    cy.xpath("//a[@href='/login']").click()
    cy.xpath("//input[@data-qa='login-email']").type(email)
    cy.xpath("//input[@data-qa='login-password']").type(password)
    cy.xpath("//button[@data-qa='login-button']").click()
}

function logoutUser() {
    cy.xpath("//a[@href='/logout']").click()
}

function verifyLoginError() {
    cy.xpath('//p').should("contain.text", "Your email or password is incorrect!")
}


