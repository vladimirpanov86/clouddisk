const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const db = require('./db_actions')
const app = express()
const PORT = config.get('serverPort')

const start = () => {
  try {

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}.`)
    })
  } catch (e) {
    console.log(`Failed to start server error = ${e}`)
  }
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers);


start()