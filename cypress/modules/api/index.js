
export const createUserViaApi = (user) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonthNumber,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobile,
    },
  }).then((res) => {    
    const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
    expect(body.responseCode, body.message).to.eq(201)
  })
}

export const deleteUserViaApi = (user) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: user.email, password: user.password },
    failOnStatusCode: false,
  })
}
