const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNewBlog } = require('./forTesting')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.delete('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'Joe III',
                password: 'joe3pass',
                name: 'Joe the 3rd'
            }
        })

        await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in the app')
        const username = page.locator('#username')
        const password = page.locator('#password')

        await expect(locator).toBeVisible()
        await expect(username).toBeVisible()
        await expect(password).toBeVisible()
    })

    describe('login', () => {
        test('success with correct credentials', async ({ page }) => {
            await page.locator('#username').fill('Joe III')
            await page.locator('#password').fill('joe3pass')
            await page.getByRole('button', { name: 'Log in' }).click()

            await expect(page.locator('.text')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.locator('#username').fill('Joe III')
            await page.locator('#password').fill('wrongpassword')
            await page.getByRole('button', { name: 'Log in' }).click()

            await expect(page.locator('.errorMessage')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Joe III', 'joe3pass')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createNewBlog(page, 'Playwright is interesting', 'Joe III', 'testing.com/tests')
            
            await expect(page.getByText('Playwright is interesting - Joe III')).toBeVisible()
        })

        test('a test can be liked', async ({ page }) => {
            await createNewBlog(page, 'Learning testing!', 'Joe III', 'testing.com/tests')
            await expect(page.getByText('Learning testing! - Joe III')).toBeVisible()

            await page.getByRole('button', { name: 'show details' }).click()
            await expect(page.getByText('0 likes')).toBeVisible()

            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('1 likes')).toBeVisible()
        })

        test('user can delete its post', async ({ page }) => {
            await createNewBlog(page, 'Learning testing 2!', 'Joe III', 'testing.com/tests')

            await page.locator('div').filter({ hasText: /^Learning testing 2! - Joe IIIshow details$/ }).getByRole('button').click()
            await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()

            page.once('dialog', async dialog => await dialog.accept())
            await page.getByRole('button', { name: 'delete blog' }).click()

            await expect(page.locator('div').filter({ hasText: /^Learning testing 2!/ })).not.toBeVisible()
        })

        test('user creator can see delete button', async ({ page }) => {       
            await createNewBlog(page, 'Learning testing 2!', 'Joe III', 'testing.com/tests')
    
            await expect(page.locator('.text')).toBeVisible()
            await page.getByRole('button', { name: 'show details' }).click()
            await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()
        })
    })
})

describe('Blog app - order test', async () => {
    beforeEach(async ({ page, request }) => {
        await request.delete('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'Joe III',
                password: 'joe3pass',
                name: 'Joe the 3rd'
            }
        })

        await page.goto('http://localhost:5173')
        await loginWith(page, 'Joe III', 'joe3pass')
        await expect(page.getByText('Succesfully logged in!')).toBeVisible()

        await createNewBlog(page, 'Blog 1', 'Joe I', 'test1.com')
        await page.getByRole('button', { name: 'Cancel' }).click()
        await createNewBlog(page, 'Blog 2', 'Joe II', 'test2.com')
        await page.getByRole('button', { name: 'Cancel' }).click()
        
        await createNewBlog(page, 'Blog 3', 'Joe III', 'test3.com')
        await page.getByRole('button', { name: 'Cancel' }).click()
        
        await createNewBlog(page, 'Blog 4', 'Joe IV', 'test4.com')
        await page.getByRole('button', { name: 'Cancel' }).click()

    })

    test.only('blogs are arranged in order according to likes', async ({ page }) => {
        // Clicking the like button in multiple blogs:
        const originalLikes = []
        const count = await page.getByRole('button', { name: 'show details' }).count()

        for (let i = 0; i < count; i++) {
            await page.getByRole('button', { name: 'show details' }).nth(i).click()
            for (let j = 0; j < i; j++) {
                await page.getByRole('button', { name: 'like' }).click()
                await page.waitForTimeout(100)
            }

            const number = await page.locator('#like-number').innerText()
            const likesNumber = parseInt(number, 10)
            originalLikes.push(likesNumber)
            
            await page.getByRole('button', { name: 'hide details' }).click()
        }

        // Checking if after a page refresh the blogs are ordered:
        await page.reload()

        const likes = []
        for (let i = 0; i < count; i++) {
            await page.getByRole('button', { name: 'show details' }).nth(i).click()

            const number = await page.locator('#like-number').innerText()
            const parsedNumber = parseInt(number, 10)
            likes.push(parsedNumber)

            await page.getByRole('button', { name: 'hide details' }).click()
        }

        const reversedOriginalLikes = [...originalLikes].reverse()

        // Converting both arrays into strings and comparing them:
        const areEqual = JSON.stringify(likes) === JSON.stringify(reversedOriginalLikes)

        expect(areEqual).toBeTruthy()
    })
})