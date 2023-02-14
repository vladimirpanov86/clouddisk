const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const db = require('./db_actions')
const authRouter = require('./routes/auth.routes')
const cors = require('./middleware/cors.middleware')
const app = express()
const PORT = config.get('serverPort')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors)

app.use('/api/auth', authRouter)

const start = () => {
  try {
    db.authenticate()
      .catch(error => console.error(`db authenticat error ${error}`))

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}.`)
    })
  } catch (e) {
    console.log(`Failed to start server error = ${e}`)
  }
}

start()