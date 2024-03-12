// test/colaborador.test.js
const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);
const { Colaborador } = require('../models');  // Importa el modelo Colaborador

describe('Pruebas para las rutas de colaboradores', () => {
  let colaboradorId;  // Variable para almacenar el ID del colaborador creado durante las pruebas

  // Prueba para la creación de un nuevo colaborador
  it('Debería crear un nuevo colaborador y enviar correo', async () => {
    try {
      const nuevoColaborador = {
        idColaborador: '2',
        nombre: 'Juan Pérez',
        correoElectronico: 'juan.perez@example.com',
        domicilio: 'Calle 123, Ciudad',
        fechaNacimiento: '1990-01-01',
        equipo: 'Equipo A',
        unidad: 'Unidad XYZ',
        tipoJornada: 'Tiempo Completo',
        estado: 'Activo',
        fechaIngreso: '2022-01-01',
        fechaSalida: null,
        idPuesto: 1,
      };

      // Ruta en la prueba
      const response = await request.post('/saag/agregar-colaborador/').send(nuevoColaborador);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', `Agregado correctamente el colaborador ${nuevoColaborador.nombre}`);
      expect(response.body).toHaveProperty('data');
      colaboradorId = response.body.data.idColaborador;  // Almacena el ID del colaborador creado
    } catch (error) {
      console.error('Error en la prueba para crear un nuevo colaborador y enviar correo:', error.message);
      throw error;
    }
  });

  // Prueba para obtener todos los colaboradores
  it('Debería obtener todos los colaboradores', async () => {
    try {
      const response = await request.get('/saag/colaboradores/');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    } catch (error) {
      console.error('Error en la prueba para obtener todos los colaboradores:', error.message);
      throw error;
    }
  });

  // Prueba para obtener un colaborador por ID
  it('Debería obtener un colaborador por ID', async () => {
    try {
      const response = await request.get(`/saag/colaborador/${colaboradorId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('idColaborador', colaboradorId);
      expect(response.body).toHaveProperty('nombre', 'Juan Pérez');
      // Agrega más expectativas según sea necesario
    } catch (error) {
      console.error('Error en la prueba para obtener un colaborador por ID:', error.message);
      throw error;
    }
  });

  // Prueba para actualizar un colaborador por ID
  it('Debería actualizar un colaborador por ID', async () => {
    try {
      const datosActualizados = {
        nombre: 'Juanito Pérez',
        correoElectronico: 'juanito.perez@example.com',
        domicilio: 'Calle 456, Ciudad Nueva',
        fechaNacimiento: '1990-02-15',
        equipo: 'Equipo B',
        unidad: 'Unidad ABC',
        tipoJornada: 'Medio Tiempo',
        estado: 'Inactivo',
        fechaIngreso: '2022-01-15',
        fechaSalida: '2023-03-01',
        idPuesto: 2,
        // ... otros datos necesarios para la actualización
      };

      const response = await request.put(`/saag/actualizar-colaborador/${colaboradorId}`).send(datosActualizados);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', `Actualizado correctamente el colaborador con ID ${colaboradorId}`);
      // Agrega más expectativas según sea necesario
    } catch (error) {
      console.error('Error en la prueba para actualizar un colaborador por ID:', error.message);
      throw error;
    }
  });

  // Prueba para eliminar un colaborador por ID
  it('Debería eliminar un colaborador por ID', async () => {
    try {
      const response = await request.delete(`/saag/eliminar-colaborador/1`);//${colaboradorId}

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'El colaborador fue eliminado exitosamente');
    } catch (error) {
      console.error('Error en la prueba para eliminar un colaborador por ID:', error.message);
      throw error;
    }
  });

  // Cerrar la conexión de la base de datos después de las pruebas
  afterAll(async () => {
    try {
      await Colaborador.sequelize.close();
    } catch (error) {
      console.error('Error al cerrar la conexión de la base de datos:', error.message);
      throw error;
    }
  });
});
