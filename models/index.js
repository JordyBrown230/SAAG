const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true
      }
  });  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.colaborador = require('./colaborador')(sequelize, Sequelize);
db.solicitud = require('./solicitud')(sequelize, Sequelize);
db.usuario = require('./usuarios')(sequelize, Sequelize);
db.ausencia = require('./ausencia')(sequelize, Sequelize);

module.exports = db;
