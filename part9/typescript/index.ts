import express from 'express'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

const port = 3003

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})