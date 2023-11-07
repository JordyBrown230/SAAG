const Sequelize = require('sequelize');
const DB_NAME = 'SAAG';
const DB_USER = 'SAAG';
const DB_PASSWORD = 'Acib2023!!!';
const DB_HOST = 'ing.mysql.database.azure.com';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true
      }
  });  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.puesto = require('./puesto')(sequelize,Sequelize);
db.colaborador = require('./colaborador')(sequelize, Sequelize);
db.solicitud = require('./solicitud')(sequelize, Sequelize);
db.usuario = require('./usuario')(sequelize, Sequelize);
db.ausencia = require('./ausencia')(sequelize, Sequelize);
db.telefono = require('./telefonoEmpleado')(sequelize,Sequelize);
db.horasExtra = require('./horasExtra')(sequelize,Sequelize);
db.expediente = require('./expediente')(sequelize,Sequelize);
db.curriculum = require('./curriculum')(sequelize, Sequelize);
db.titulo = require('./titulo')(sequelize,Sequelize);

module.exports = db;
