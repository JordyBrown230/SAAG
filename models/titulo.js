module.exports = (sequelize,Sequelize) => {
    const Titulo = sequelize.define('Titulo', {
        idTitulo:{
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
        idColaborador: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    },{
        tableName: 'Titulo',
        timestamps: false
    });

    Titulo.belongsTo(sequelize.models.Colaborador, {
        foreignKey: 'idColaborador',
        as: 'colaborador'
    });
    
    return Titulo;
};