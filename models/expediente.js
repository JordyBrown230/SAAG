module.exports = (sequelize, Sequelize) => {
  const Expediente = sequelize.define('expediente', {
    idExpediente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaIngreso: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fechaSalida: {
      type: Sequelize.DATE,
      allowNull: true
    },
    idColaborador: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'Expediente',
    timestamps: false
  });

  Expediente.belongsTo(sequelize.models.Colaborador, {
    foreignKey: 'idColaborador', 
    as: 'colaborador'
  });
  
  return Expediente;
};
