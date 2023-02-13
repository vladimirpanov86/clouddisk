const Sequilize = require('sequelize')
const config = require('config')

module.exports = new Sequilize(config.get('dbName'), config.get('dbUser'), config.get('dbPassword'), {
  host: config.get('dbHost'),
  dialect: 'postgres',
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})

// const Pool = require('pg').Pool
// const config = require('config')

// const pool = new Pool({
//   user: config.get('dbUser'),
//   host: config.get('dbHost'),
//   database: config.get('dbName'),
//   password: config.get('dbPassword'),
//   port: 5432,
// })

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM accounts LIMIT 100', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// module.exports = {
//   getUsers,
// }