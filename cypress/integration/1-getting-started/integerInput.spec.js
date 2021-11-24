/// <reference types="cypress" />

// Welcome to Cypress!

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const selector = "[data-testId='integer-input']"

describe('integer-input', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('starts with a value of zero', () => {
    cy.get(selector).should('have.value', '0')
  })

  it('has a value of 1 if we type 1', () => {
    cy.get(selector).shadow().find('input').type('1')
    cy.get(selector).should('have.value', '1')
  })

  it('has a value of 15 if we type 1.5', () => {
    cy.get(selector).shadow().find('input').type('1.5')
    cy.get(selector).should('have.value', '15')
  })

  it("does not accept not integer input values", () => {
    cy.get(selector).shadow().find('input').type('1.+e3')
    cy.get(selector).should('have.value', '13')
  })
})
