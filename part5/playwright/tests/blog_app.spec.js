const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in the app')
        expect(locator).toBeVisible()
    })
})