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
            cy.login({ username: 'Joe III', password: 'joe3pass' })

            cy.contains('Succesfully logged in!')
            cy.contains('Joe the 3rd logged in')
        })

        it('fails with wrong credentials', () => {
            cy.login({ username: 'Joe III', password: 'wrongpassword' })

            cy.contains('Invalid username/password.')
            cy.get('.errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('when logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'Joe III', password: 'joe3pass' })
        })

        it('a blog can be created!', () => {
            cy.newBlog({ title: '1st blog', author: 'Joe III', url: 'testingCypress.com' })

            cy.contains('1st blog - Joe III')
        })

        it('user can like a blog', () => {
            cy.newBlog({ title: '1st blog', author: 'Joe III', url: 'testingCypress.com' })
            
            cy.contains('show details').click()
            cy.get('button').contains('like').click()
            
            cy.contains('1 likes')
        })

        it('user can delete its blog', () => {
            cy.newBlog({ title: '1st blog', author: 'Joe III', url: 'testingCypress.com' })

            cy.contains('show details').click()
            cy.contains('delete blog').click()
            cy.on('window:conmfirm', () => true)

            cy.contains('1st blog - Joe III').should('not.exist')
        })
    })
})