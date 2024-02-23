
module.exports = (sequelize,Sequelize) => {
    const Documento = sequelize.define('Documento', {
        idDocumento:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombreArchivo: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        archivo: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        tamaño: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        fechaSubida: {
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        idColaborador: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    },{
        tableName: 'Documento',
        timestamps: false
    });
    Documento.belongsTo(sequelize.models.Colaborador, {
        foreignKey: 'idColaborador',
        as: 'colaborador'
    });

    return Documento;
};

