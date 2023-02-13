const { DataTypes } = require('sequelize')
const db = require('../db_actions')

const Users = db.define('users',
  // Описание таблиц
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diskspace: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    usedspace: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  // Опции
  {
    timestamps: false
  }
)

module.exports = Users