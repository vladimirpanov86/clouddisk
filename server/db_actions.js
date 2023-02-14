const Sequilize = require('sequelize')
const config = require('config')

module.exports = new Sequilize(config.get('dbName'), config.get('dbUser'), config.get('dbPassword'), {
  host: config.get('dbHost'),
  dialect: 'postgres',
  logging: false,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})
