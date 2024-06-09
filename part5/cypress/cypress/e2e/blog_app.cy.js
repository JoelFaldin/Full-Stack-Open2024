describe('Blog app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', () => {
        cy.contains('Log in the app')
        cy.get('#username-label').should('contain', 'Username')
        cy.get('#password-label').should('contain', 'Password')
        cy.get('button').should('contain', 'Log in')
    })
})