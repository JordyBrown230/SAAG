module.exports = (sequelize, Sequelize) => {
    const Colaborador = sequelize.define('Colaborador', {
        idColaborador: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        identificacion: { 
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        fotoCarnet: {
            type: Sequelize.BLOB('long'),
            allowNull: true
        },
        nombre: {
            type: Sequelize.STRING(150),
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
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        equipo: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        unidad: {
            type: Sequelize.STRING(250),
            allowNull: true
        },
        estado: {
            type: Sequelize.STRING(50),
            allowNull: false
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

