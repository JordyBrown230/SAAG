const mysql = require('mysql');

// Configuración de la conexión MySQL
var dbConnection = mysql.createConnection({
  host: 'ing.mysql.database.azure.com',
  user: 'SAAG',
  password: 'Acib2023!!!',
  database: 'SAAG',
  port: 3306,
  ssl: { ca: fs.readFileSync('{ca-cert filename}') }
});

// Establecer la conexión a la base de datos
dbConnection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos MySQL:', err);
  } else {
    console.log('Conexión a la base de datos MySQL exitosa');
  }
});

const Sequelize = require('sequelize');
const DB_NAME = 'SAAG';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
  // Pasar la conexión de MySQL como una opción adicional
  dialectOptions: {
    socketPath: dbConnection
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.puesto = require('./puesto')(sequelize, Sequelize);
db.colaborador = require('./colaborador')(sequelize, Sequelize);
db.solicitud = require('./solicitud')(sequelize, Sequelize);
db.usuario = require('./usuario')(sequelize, Sequelize);
db.ausencia = require('./ausencia')(sequelize, Sequelize);
db.telefono = require('./telefonoEmpleado')(sequelize, Sequelize);
db.horasExtra = require('./horasExtra')(sequelize, Sequelize);
db.expediente = require('./expediente')(sequelize, Sequelize);
db.curriculum = require('./curriculum')(sequelize, Sequelize);
db.titulo = require('./titulo')(sequelize, Sequelize);

module.exports = db;
