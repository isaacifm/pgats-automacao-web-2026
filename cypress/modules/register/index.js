export function registerUser(user) {
    cy.get("a[href='/login']").click()
    cy.get("input[data-qa='signup-name']").type(user.name)
    cy.get("input[data-qa='signup-email']").type(user.email)
    cy.get("button[data-qa='signup-button']").click()
}

export function fillUserDetails(user) {
    const genderId = user.title === 'Mrs' ? 'id_gender2' : 'id_gender1'
    cy.get(`input[id='${genderId}']`).check()
    cy.get("input[data-qa='password']").type(user.password)
    cy.get('[data-qa="days"]').select(user.birthDay)
    cy.get('[data-qa="months"]').select(user.birthMonth)
    cy.get('[data-qa="years"]').select(user.birthYear)
    cy.get("input[id='newsletter']").check()
    cy.get("input[id='optin']").check()
    cy.get("input[data-qa='first_name']").type(user.firstName)
    cy.get("input[data-qa='last_name']").type(user.lastName)
    cy.get("input[data-qa='company']").type(user.company)
    cy.get('[data-qa="address"]').type(user.address1)
    cy.get("[data-qa='address2']").type(user.address2)
    cy.get("[data-qa='country']").select(user.country)
    cy.get("[data-qa='state']").type(user.state)
    cy.get("[data-qa='city']").type(user.city)
    cy.get("[data-qa='zipcode']").type(user.zipcode)
    cy.get("[data-qa='mobile_number']").type(user.mobile)
    cy.get("button[data-qa='create-account']").click()
}

export function verifyAccountCreation() {
    cy.get("h2[data-qa='account-created']").should("contain.text", "Account Created!")
    cy.get("a[data-qa='continue-button']").click()
}

export function verifyHomePage(userName) {
    cy.contains("b", userName).should("be.visible")
}

export function deleteAccount() {
    cy.get("a[href='/delete_account']").click()
    cy.get("h2[data-qa='account-deleted']").should("contain.text", "Account Deleted!")
}

export function loginUser(email, password) {
    cy.get("a[href='/login']").click()
    cy.get("input[data-qa='login-email']").type(email)
    cy.get("input[data-qa='login-password']").type(password)
    cy.get("button[data-qa='login-button']").click()
}

export function logoutUser() {
    cy.get("a[href='/logout']").click()
    cy.url().should('include', '/login')
    cy.get("a[href='/logout']").should('not.exist')
}

export function verifyLoginError() {
    cy.contains('p', "Your email or password is incorrect!").should("be.visible")
}

export function verifyExistingEmailError() {
    cy.contains('p', 'Email Address already exist!').should('be.visible')
}
