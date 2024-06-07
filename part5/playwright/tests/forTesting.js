const loginWith = async (page, username, password) => {
    await page.locator('#username').fill(username)
    await page.locator('#password').fill(password)
    await page.getByRole('button', { name: 'Log in' }).click()
}

const createNewBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('#title').fill(title)
    await page.locator('#author').fill(author)
    await page.locator('#url').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createNewBlog }