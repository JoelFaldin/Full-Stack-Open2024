import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import * as blogService from '../services/blogs'

test('renders blog title and author', async () => {
    const blogData = {
        author: 'John M.',
        id: '...',
        likes: 0,
        url: 'test.com',
        user: {
            username: 'userTest',
            name: 'superTester',
            id: '...2'
        }
    }

    const mockhandler = vi.fn()

    const { container } = render(<Blog blog={blogData} userName='' blogs={[blogData]} setBlogs={mockhandler} handleMessages={mockhandler} />)

    const blogTitle = container.querySelector('.blog-title')
    const blogAuthor = container.querySelector('.blog-author')
    const blogURL = container.querySelector('.blog-url')
    const blogLikes = container.querySelector('.blog-likes')

    expect(blogTitle).toBeDefined()
    expect(blogAuthor).toBeDefined()
    expect(blogURL).toBeNull()
    expect(blogLikes).toBeNull()
})

test('renders blog url and number of likes when clicking on "show details"', async () => {
    const blogData = {
        author: 'John M.',
        id: '...',
        likes: 0,
        url: 'test.com',
        user: {
            username: 'userTest',
            name: 'superTester',
            id: '...2'
        }
    }

    const mockhandler = vi.fn()


    const { container } = render(<Blog blog={blogData} userName='' blogs={[blogData]} setBlogs={mockhandler} handleMessages={mockhandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('show details')
    await user.click(button)

    const blogURL = container.querySelector('.blog-url')
    const blogLikes = container.querySelector('.blog-likes')

    expect(blogURL).toBeDefined()
    expect(blogLikes).toBeDefined()
})

// Simulating the api request:
vi.mock('../services/blogs', () => ({
    default: {
        addLike: vi.fn(() => Promise.resolve({ status: 200 })),
    }
}))

test('detecting double click of button', async () => {
    const blogData = {
        author: 'John M.',
        id: '1',
        likes: 0,
        title: 'Test Blog',
        url: 'test.com',
        user: {
            username: 'John M.',
            name: 'John M.',
            id: '2'
        }
    }

    const mockSetBlogs = vi.fn()
    const mockHandleMessages = vi.fn()

    const { container } = render(<Blog blog={blogData} userName='superTester' blogs={[blogData]} setBlogs={mockSetBlogs} handleMessages={mockHandleMessages} />)

    const user = userEvent.setup()
    const button = screen.getByText('show details')
    await user.click(button)

    const likeButton = container.querySelector('.like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockSetBlogs.mock.calls).toHaveLength(2)
})