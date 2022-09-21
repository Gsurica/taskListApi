const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')

const User = require('../app/models/User')
const Task = require('../app/models/Task')

const models = [User, Task]

class Database {
  constructor () {
    this.init()
  }
  init () {
    this.connection = new Sequelize(databaseConfig)
    models.map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new Database()
