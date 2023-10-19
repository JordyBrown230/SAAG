module.exports = (sequelize, Sequelize) => {
    const Colaborador = sequelize.define('Colaborador', {
        idColaborador: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(90),
            allowNull: false
        },
        correoElectronico: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        domicilio: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        fechaNacimiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        unidad: {
            type: Sequelize.STRING(250),
            allowNull: true
        },
        idPuesto: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'Colaborador',
        timestamps: false
    });

    Colaborador.belongsTo(sequelize.models.Puesto, {
        foreignKey: 'idPuesto',
        as: 'puesto'
    });
    
    return Colaborador;
};
