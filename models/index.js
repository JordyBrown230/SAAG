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

db.puesto = require('./puesto')(sequelize,Sequelize);
db.colaborador = require('./colaborador')(sequelize, Sequelize);
db.solicitud = require('./solicitud')(sequelize, Sequelize);
db.usuario = require('./usuarios')(sequelize, Sequelize);
db.ausencia = require('./ausencia')(sequelize, Sequelize);
db.telefono = require('./telefonoEmpleado')(sequelize,Sequelize);
db.horasExtra = require('./horasExtra')(sequelize,Sequelize);
db.expediente = require('./expediente')(sequelize,Sequelize);
db.curriculum = require('./curriculum')(sequelize, Sequelize);
db.titulo = require('./titulo')(sequelize,Sequelize);

module.exports = db;
