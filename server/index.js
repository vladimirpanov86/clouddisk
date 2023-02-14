const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const db = require('./db_actions')
const authRouter = require('./routes/auth.routes')
const app = express()
const PORT = config.get('serverPort')
const Users = require('./models/Users')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/auth', authRouter)

const start = () => {
  try {

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}.`)
    })
  } catch (e) {
    console.log(`Failed to start server error = ${e}`)
  }
}



db.authenticate()
  .catch(error => console.error(error))



app.get('/', async (request, response) => {
  try {
    await Users.create({
      email: 'admin@admin.ru',
      password: 'admin123',
      diskspace: 10,
      usedspace: 20,
      avatar: 'url'
    })
    response.status(200).json({
      status: true
    })
  } catch (e) {
    response.status(404).json({
      error: error.message
    })
  }
})

app.get('/users', async (request, response) => {
  try {
    const users = await Users.findAll()
    console.log("All users:", JSON.stringify(users, null, 2));
    response.status(200).json({
      status: true
    })
  } catch (e) {
    response.status(404).json({
      error: e.message
    })
  }
})

start()