module.exports = (sequelize, Sequelize) => {
  const Solicitud = sequelize.define('Solicitud', {
      idSolicitud: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      tipoSolicitud: {
          type: Sequelize.STRING(45),
          allowNull: false
      },
      asunto: {
          type: Sequelize.STRING(45),
          allowNull: false
      },
      nomColaborador: {
          type: Sequelize.STRING(45),
          allowNull: false
      },
      nomEncargado: {
          type: Sequelize.STRING(45),
          allowNull: true
      },
      fechaSolicitud: {
          type: Sequelize.STRING(45),
          allowNull: false
      },
      fechaInicio: {
          type: Sequelize.DATE,
          allowNull: true
      },
      fechaFin: {
          type: Sequelize.DATE,
          allowNull: true
      },
      sustitucion: {
          type: Sequelize.STRING(45),
          allowNull: true
      },
      sustituto: {
          type: Sequelize.STRING(45),
          allowNull: true
      },
      tiempo: {
          type: Sequelize.TIME,
          allowNull: true
      },
      firmaColaborador: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      firmaEncargado: {
          type: Sequelize.BLOB,
          allowNull: true
      },
      firmaRRHH: {
          type: Sequelize.BLOB,
          allowNull: true
      },
      procesado: {
          type: Sequelize.STRING(90),
          allowNull: true
      },
      comentario: {
          type: Sequelize.STRING(250),
          allowNull: true
      },
      idColaborador: {
          type: Sequelize.INTEGER,
          allowNull: false,
      }
  }, {
      tableName: 'Solicitud',
      timestamps: false
  });

  Solicitud.associate = (models) => {
      Solicitud.belongsTo(models.Colaborador, {
          foreignKey: 'idColaborador',
          as: 'colaborador'
      });
  };

  return Solicitud;
};