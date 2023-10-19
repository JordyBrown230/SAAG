module.exports = (sequelize, Sequelize) => {
    const Curriculum = sequelize.define('Curriculum', {
        idCurriculum : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        nombreArchivo :{
            type: Sequelize.STRING(150),
            allowNull: false,
        },
        archivo: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        idColaborador: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'Curriculum',
        timestamps: false
    });
    Curriculum.belongsTo(sequelize.models.Colaborador, {
        foreignKey: 'idColaborador',
        as: 'colaborador'
    });
    return Curriculum;
};
