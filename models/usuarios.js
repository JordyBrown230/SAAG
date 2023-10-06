module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
      idUsuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NomUsuario: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      contrasena: {
        type: Sequelize.CHAR(64),
        allowNull: false
      },
      rol: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    }, {
      tableName: 'Usuario',
      timestamps: false
    });
  
    return Usuario;
};
