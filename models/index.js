const Sequelize = require('sequelize');
const sequelize = new Sequelize('acib', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true// para que no agruegue la S tipo solicitud's', al crear el schema en la db xd.
      }
  });  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.solicitud = require('./solicitud')(sequelize, Sequelize);
db.usuario = require('./usuario')(sequelize, Sequelize);

module.exports = db;
