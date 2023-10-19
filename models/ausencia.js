module.exports = (sequelize, Sequelize) => {
    const Ausencia = sequelize.define('Ausencia', {
        idAusencia: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechaAusencia: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fechaFin: {
            type: Sequelize.DATE,
            allowNull: true
        },
        razon: {
            type: Sequelize.STRING(250),
            allowNull: true
        },
        idColaborador: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Ausencia',
        timestamps: false
    });
    //crea la restriccion de llave foranea en la bd
    Ausencia.belongsTo(sequelize.models.Colaborador, {
        foreignKey: 'idColaborador',
        as: 'colaborador'
    });

    return Ausencia;
};
