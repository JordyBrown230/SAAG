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
      curriculum: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      titulo: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      fechaSalida: {
        type: Sequelize.DATE,
        allowNull: true
      },
      idColaborador: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'Expediente',
      timestamps: false
    });
  
    Expediente.associate = (models) => {
      Expediente.belongsTo(models.Colaborador, {
        foreignKey: 'idColaborador',
        as: 'colaborador'
      });
    };
  
    return Expediente;
  
  };
  