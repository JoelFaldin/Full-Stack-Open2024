const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    let newTotal = 0
    array.map(blog => {
        newTotal += blog.likes
    })
    return newTotal
}

const favoriteBlog = (array) => {
     const mostLiked = array.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
     })
    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

const mostBlogs = (array) => {
    const names = _.countBy(array, 'author')
    const newArray = _.map(_.keys(names), (author) => {
        return {
            author: author,
            blogs: names[author]
        }
    })
    const mostActive = newArray.reduce((prev, current) => {
        return prev.blogs > current.blogs ? prev : current
    }, {})
    // console.log(mostActive) // { author: 'Arto Hellas', blogs: 2 }
    return mostActive
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }