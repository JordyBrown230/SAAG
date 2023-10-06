module.exports = (sequelize, Sequelize) => {
    const Puesto = sequelize.define('Puesto', {
        idPuesto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombrePuesto: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
        idExpediente: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'Puesto',
        timestamps: false
    });

    Puesto.associate = (models) => {
        Puesto.belongsTo(models.Expediente, {
            foreignKey: 'idExpediente',
            as: 'Expediente'
        });
    };

    return Puesto;
};
