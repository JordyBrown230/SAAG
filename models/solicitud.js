module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define('solicitud', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Solicitud;
  };
  