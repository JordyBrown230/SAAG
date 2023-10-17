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
          sustituto: {
            type: Sequelize.STRING(45),
            allowNull: true
          },
          tiempo: {
            type: Sequelize.TIME,
            allowNull: true
          },
          estado: {
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
              references: {
                  model: 'Colaborador',
                  key: 'idColaborador'
              }
          },
          idEncargado: {
              type:  Sequelize.INTEGER,
              allowNull : true,
              references : {
                  model: 'Colaborador',
                  key: 'idColaborador'
              }
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
  