const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Task extends Model {
  static init (sequelize) {
    super.init(
      {
        task: Sequelize.STRING,
        check: Sequelize.BOOLEAN,
      },
      {
        sequelize
      }
    )
    return this
  }
  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Task
