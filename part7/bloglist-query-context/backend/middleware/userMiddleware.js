const jwt = require('jsonwebtoken')
const User = require("../models/user")

const getUser = async (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'The token is invalid!!' })
        }
        
        const userRequest = await User.findOne({ username: decodedToken.username })
        if (userRequest) {
            req.user = userRequest
        }
    }
    
    next()
}

module.exports = { getUser }