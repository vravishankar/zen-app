const config = require('config');
const logger = require('../utils/logger');

// const DB_URL = config.get('db.url');

const Sequelize = require('sequelize');
// const sequelize = new Sequelize(DB_URL, {
//   operatorsAliases: false,
//   logging: false
// });
const DB_NAME = config.get('db.database')
const DB_USER = config.get('db.username')
const DB_PASS = config.get('db.password')
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS , {
  dialect: 'postgres',
  logging : function(str) { logger.debug(str) }, // config.get('db.logging'),
  operatorsAliases: false,
  pool: {
    max: config.get('db.pool-max') || 20,
    min: config.get('db.pool-min') || 0,
    idle: config.get('db.pool-idle') || 10000,
    acquire: config.get('db.pool-acquire') || 30000
  }
})

const models = {
    Country: sequelize.import('./Country'),
    Function: sequelize.import('./Function'),
    Product: sequelize.import('./Product'),
    User: sequelize.import('./User')
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
});
  
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;