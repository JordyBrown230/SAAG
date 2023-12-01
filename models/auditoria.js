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
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')"),
        }
    }, {
        tableName: 'Auditoria',
        timestamps: false
    });


    return Auditoria;
};
