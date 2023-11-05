const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('Pruebas para las rutas de ausencia', () => {
    // Prueba para la creación de una ausencia
    it('Debería crear una nueva ausencia', async () => {
      const response = await request.post('/saag/agregar-ausencia').send({
        idAusencia: 1,
        fechaAusencia: '2023-10-10',
	      fechaFin: '2023-10-12',
	      razon: 'desconocida',
        nombreColaborador: 'Henry',
	      idColaborador: 1
      });
      expect(response.statusCode).toBe(200);
    });

    // Prueba para obtener todas las ausencias
    it('Debería obtener todas las ausencias', async () => {
      const response = await request.get('/saag/ausencias');
      const numeroDeRegistros = response.body.length;
      expect(response.statusCode).toBe(200);
      expect(numeroDeRegistros).toBeGreaterThan(0);
    });

    
    it('Debería obtener todas las ausencias del colaborador mediante su id', async () => {
      const colaboradorId = 1;
      const response = await request.get(`/saag/ausencias-por-colaborador/${colaboradorId}`);
      const numeroDeRegistros = response.body.length;
      expect(response.statusCode).toBe(200);
      expect(numeroDeRegistros).toBeGreaterThan(0);
    });


    // Prueba para obtener una ausencia por ID
    it('Debería obtener una ausencia por ID', async () => {
      const ausenciaId = 1;
      const response = await request.get(`/saag/ausencia/${ausenciaId}`);
       expect(response.statusCode).toBe(200);
       expect(response.body.idAusencia).toBe(ausenciaId);
    });
  
  // Prueba para actualizar una ausencia por ID
  it('Debería actualizar una ausencia por ID', async () => {
    const ausenciaId = 1;
    // Datos para la actualización
    const updatedData = {
      fechaAusencia: "2020-10-17",
      fechaFin: "2020-10-19",
      razon: "desconocida",
      nombreColaborador: "Henry",
      idColaborador: 1
    };
    const response = await request.put(`/saag/actualizar-ausencia/${ausenciaId}`).send(updatedData);
    expect(response.statusCode).toBe(200);
  });
  // Prueba para eliminar una ausencia por ID
  it('Debería eliminar una ausencia por ID', async () => {
    const ausenciaId = 1;
    const response = await request.delete(`/saag/eliminar-ausencia/${ausenciaId}`);
     expect(response.statusCode).toBe(200);
     expect(response.body.message).toBe('La ausencia fue eliminada exitosamente');
  });
});
  