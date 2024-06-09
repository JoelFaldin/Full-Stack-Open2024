describe('Blog app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')

        cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
        const newUser = {
            username: "Joe III",
            name: "Joe the 3rd",
            password: "joe3pass"
        }
        
        cy.request('POST', 'http://localhost:3003/api/users', newUser)

    })
  
    it('Login form is shown', () => {
        cy.contains('Log in the app')
        cy.get('#username-label').should('contain', 'Username')
        cy.get('#password-label').should('contain', 'Password')
        cy.get('button').should('contain', 'Log in')
    })

    describe('login', () => {
        it('success with correct credentials', () => {
            cy.get('#username-label').type('Joe III')
            cy.get('#password-label').type('joe3pass')
            cy.get('button').click()

            cy.contains('Succesfully logged in!')
            cy.contains('Joe the 3rd logged in')
        })

        it('fails with wrong credentials', () => {
            cy.get('#username-label').type('Joe III')
            cy.get('#password-label').type('wrongpassword')
            cy.get('button').click()

            cy.contains('Invalid username/password.')
            cy.get('.errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})