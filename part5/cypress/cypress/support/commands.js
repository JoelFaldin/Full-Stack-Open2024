// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.get('#username-label').type(username)
    cy.get('#password-label').type(password)
    cy.get('button').click()
})

Cypress.Commands.add('newBlog', ({ title, author, url }) => {
    cy.contains('new blog').click()

    cy.get('#title').type(title)
    cy.get('#author').type(author)
    cy.get('#url').type(url)

    cy.get('button').contains('Create').click()
    cy.get('button').contains('cancel').click()
})