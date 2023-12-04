module.exports = (sequelize, Sequelize) => {
    const Auditoria = sequelize.define('Auditoria', {
        idAuditoria: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nombreUsuario: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        rol: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        metodo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        url : {
            type: Sequelize.STRING,
            allowNull: false,
        },
        datosAntiguos : {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        datosNuevos : {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        tableName: 'Auditoria',
        timestamps: false
    });


    return Auditoria;
};
