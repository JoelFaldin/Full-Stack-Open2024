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

module.exports = { dummy, totalLikes, favoriteBlog }