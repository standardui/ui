/// <reference types="cypress" />

const selector = "[data-testId='integer-input']"

describe('integer-input', () => {
  beforeEach(() => {
    cy.visit('/test-pages/integer-input.html')
  })

  it('starts with an empty value', () => {
    cy.get(selector).should('have.value', '')
  })

  it('has a value of 1 if we type 1', () => {
    cy.get(selector).shadow().find('input').type('1')
    cy.get(selector).should('have.value', '1')
  })

  it('has a value of 15 if we type 1.5', () => {
    cy.get(selector).shadow().find('input').type('1.5')
    cy.get(selector).should('have.value', '15')
  })

  it('does not accept not integer input values', () => {
    cy.get(selector).shadow().find('input').type('1.+e3')
    cy.get(selector).should('have.value', '13')
  })
})
