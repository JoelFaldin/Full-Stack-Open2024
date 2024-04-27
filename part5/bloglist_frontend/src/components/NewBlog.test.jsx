import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

// Simulating api request:
vi.mock('../services/blogs', () => ({
    default: {
        newBlog: vi.fn(() => Promise.resolve({ status: 200 }))
    }
}))

test('<NewBlog /> calls correct event handler when creating a new blog', async () => {
    const mockHandleMessages = vi.fn()

    const { container } = render(<NewBlog handleMessages={mockHandleMessages} />)

    const showFormButton = container.querySelector('.showForm')
    const user = userEvent.setup()
    await user.click(showFormButton)

    const inputTitle = screen.getByPlaceholderText('Blog title')
    const inputAuthor = screen.getByPlaceholderText('Blog author')
    const inputUrl = screen.getByPlaceholderText('Blog url')
    const sendButton = screen.getByText('Create')
    await user.type(inputTitle, 'Testing Vitest')
    await user.type(inputAuthor, 'The tester')
    await user.type(inputUrl, 'thetestertests.com')
    await user.click(sendButton)

    expect(mockHandleMessages.mock.calls).toHaveLength(1)
})