import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

    const mockFunction = () => {
        return
    }

    const { container } = render(<Blog blog={blogData} userName='' blogs={[blogData]} setBlogs={mockFunction} handleMessages={mockFunction} />)

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

    const mockFunction = () => {
        return
    }

    const { container } = render(<Blog blog={blogData} userName='' blogs={[blogData]} setBlogs={mockFunction} handleMessages={mockFunction} />)

    const user = userEvent.setup()
    const button = screen.getByText('show details')
    await user.click(button)

    const blogURL = container.querySelector('.blog-url')
    const blogLikes = container.querySelector('.blog-likes')

    expect(blogURL).toBeDefined()
    expect(blogLikes).toBeDefined()
})