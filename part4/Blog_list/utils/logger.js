const data = (...params) => {
    console.log(...params)
}

const problem = (...params) => {
    console.error(...params)
}

module.exports = { data, problem }