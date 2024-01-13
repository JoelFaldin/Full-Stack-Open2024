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

module.exports = { dummy, totalLikes }