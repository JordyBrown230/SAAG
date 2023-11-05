const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('Pruebas para las rutas de solicitud', () => {
  // Prueba para la creación de una solicitud
  it('Debería crear una nueva solicitud', async () => {
    const insertData= {
    idSolicitud:1,
    conGoceSalarial: true,
    tipoSolicitud: 'Vacaciones',
    asunto: 'Request for vacation approval',
    nombreColaborador: 'John Doe',
    nombreEncargado: 'Manager',
    fechaSolicitud: '2023-10-17T08:00:00Z',
    fechaInicio: '2023-10-20T00:00:00Z',
    fechaFin: '2023-10-25T00:00:00Z',
    horaInicio: '08:00:00',
    horaFin: '17:00:00',
    sustitucion: 'SI',
    nombreSustituto: 'Jane Smith',
    estado: 'Pendiente',
    comentarioTalentoHumano: 'Pending approval from HR',
    idColaborador: 1
    }
    const response = await request.post('/saag/agregar-solicitud').send(insertData);
   // expect(response.statusCode).toBe(200);
    //expect(response.body.data.tipoSolicitud).toBe(insertData.tipoSolicitud);
  });

  // Prueba para obtener todas las solicitudes
  it('Debería obtener todas las solicitudes', async () => {
    const response = await request.get('/saag/solicitudes');
    const numeroDeRegistros = response.body.length;
   // expect(response.statusCode).toBe(200);
   // expect(numeroDeRegistros).toBeGreaterThan(0);
  });

  it('Debería obtener todas las solicitudes del colaborador mediante su id', async () => {
    const colaboradorId = 1;
    const response = await request.get(`/saag/solicitudes-por-colaborador/${colaboradorId}`);
    const numeroDeRegistros = response.body.length;
   // expect(response.statusCode).toBe(200);
    //expect(numeroDeRegistros).toBeGreaterThan(0);
  });

  // Prueba para obtener una solicitud por ID
  it('Debería obtener una solicitud por ID', async () => {
    const solicitudId = 1;
    const response = await request.get(`/saag/solicitud/${solicitudId}`);
    //expect(response.statusCode).toBe(200);
   // expect(response.body.idSolicitud).toBe(solicitudId);
  });

  // Prueba para actualizar una solicitud por ID
  it('Debería actualizar una solicitud por ID', async () => {
    const solicitudId = 1;
    const updatedData = {
        idSolicitud:1,
        conGoceSalarial: true,
        tipoSolicitud: 'Vacaciones',
        asunto: 'Request for vacation approval',
        nombreColaborador: 'John Doe',
        nombreEncargado: 'Manager',
        fechaSolicitud: '2023-10-17T08:00:00Z',
        fechaInicio: '2023-10-20T00:00:00Z',
        fechaFin: '2023-10-25T00:00:00Z',
        horaInicio: '08:00:00',
        horaFin: '17:00:00',
        sustitucion: 'SI',
        nombreSustituto: 'Jane Smith',
        estado: 'Aprobada',
        comentarioTalentoHumano: 'Pending approval from HR',
        idColaborador: 1
        };
    const response = await request.put(`/saag/actualizar-solicitud/${solicitudId}`).send(updatedData);
    //expect(response.statusCode).toBe(200);
    //expect(response.body.solicitud.estado).toBe(updatedData.estado);
  });

  // Prueba para eliminar una solicitud por ID
  it('Debería eliminar una solicitud por ID', async () => {
    const solicitudId = 1;
    const response = await request.delete(`/saag/eliminar-solicitud/${solicitudId}`);
    //expect(response.statusCode).toBe(200);
    //expect(response.body.message).toBe('La solicitud fue eliminada exitosamente');
  });
});
