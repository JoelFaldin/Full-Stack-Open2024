const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    let total = 0
    array.map(blog => {
        total += blog.likes
    })
    return total
}

module.exports = { dummy, totalLikes }