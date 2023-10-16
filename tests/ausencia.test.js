const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('Pruebas para las rutas de ausencia', () => {
    // Prueba para la creación de una ausencia
    it('Debería crear una nueva ausencia', async () => {
      const response = await request.post('/saag/ausencia').send({
        fechaAusencia: "2023-10-10",
	      fechaFin: "2023-10-12",
	      razon: "desconocida",
	      idColaborador: 2
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.razon).toBe('desconocida');
    });
    // Prueba para obtener todas las ausencias
    it('Debería obtener todas las ausencias', async () => {
      const response = await request.get('/saag/ausencias');
      const numeroDeRegistros = response.body.length;
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(13);
      expect(numeroDeRegistros).toBeGreaterThan(1);
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
    const ausenciaId = 2;
    // Datos para la actualización
    const updatedData = {
      fechaAusencia: "2023-10-17",
      fechaFin: "2023-10-19",
      razon: "desconocida",
      idColaborador: 3
    };
    const response = await request.put(`/saag/ausencia/${ausenciaId}`).send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.razon).toBe(updatedData.razon);
  });
  // Prueba para eliminar una ausencia por ID
  it('Debería eliminar una ausencia por ID', async () => {
    const ausenciaId = 4;
    const response = await request.delete(`/saag/ausencia/${ausenciaId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('La ausencia fue eliminada exitosamente');
  });
});
  