import { render, screen } from '@testing-library/react'
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