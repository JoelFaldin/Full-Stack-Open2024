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

        it('only blog creator can see delete button', () => {
            cy.newBlog({ title: '2nd blog', author: 'Joe III', url: 'testingCypress2.com' })

            cy.get('button').contains('show details').click()
            cy.get('button').contains('delete blog')
            cy.get('button').contains('Log out').click()

            const newUser = {
                username: "Joe IV",
                name: "Joe the 4th",
                password: "joe4pass"
            }
            
            cy.request('POST', 'http://localhost:3003/api/users', newUser)

            cy.login({ username: 'Joe IV', password: 'joe4pass' })
            cy.get('button').contains('show details').click()

            cy.get('button').contains('delete blog').should('not.exist')
        })

        it.only('blogs are ordered by likes', () => {
            cy.newBlog({ title: '1st blog', author: 'Joe III', url: 'testingCypress1.com' })
            cy.newBlog({ title: '2nd blog', author: 'Joe III', url: 'testingCypress2.com' })
            cy.newBlog({ title: '3rd blog', author: 'Joe III', url: 'testingCypress3.com' })
            cy.newBlog({ title: '4st blog', author: 'Joe III', url: 'testingCypress4.com' })

            // Liking a blog multiple times:
            for (let i = 0; i < 4; i++) {
                cy.get('.blog').eq(i).contains('show details').click()
                for (let k = 0; k < i; k++) {
                    cy.get('button').contains('like').click()
                }
                cy.get('button').contains('hide details').click()
            }
                
            // Checking if blogs are in order:
            cy.visit('http://localhost:5173')

            const likes = []
            for (let i = 0; i < 4; i++) {
                cy.get('.blog').contains('show details').click()
                cy.get('.details').find('#like-number').invoke('text').then(text => {
                    likes.push(parseInt(text))
                })
                cy.get('button').contains('hide details').click()
            }

            const sortedLikes = [...likes].sort((a, b) => b - a)

            expect(likes).to.deep.equal(sortedLikes)
        })
    })
})