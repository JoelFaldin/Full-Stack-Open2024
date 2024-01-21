const data = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
      }
}

const problem = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}

module.exports = { data, problem }