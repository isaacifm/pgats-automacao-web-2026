/** Gera um usuário único para cada execução */
export const buildUser = () => {
  const id = `${Date.now()}${Cypress._.random(100, 999)}`
  return {
    name: `autpgats tests${id}`,
    email: `autpgatstests${id}@example.com`,
    password: 'Senha@123',
    title: 'Mr',
    birthDay: '10',
    birthMonth: 'May',
    birthMonthNumber: '5',
    birthYear: '1990',
    firstName: 'Isaac',
    lastName: 'Tester',
    company: 'QA Company',
    address1: 'Rua das Flores, 100',
    address2: 'Apto 12',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobile: '11999998888',
  }
}

export const card = {
  name: 'Isaac Tester',
  number: '4111111111111111',
  cvc: '123',
  month: '12',
  year: '2030',
}
