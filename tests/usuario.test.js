// const app = require('../index');
// const supertest = require('supertest');
// const request = supertest(app);

// describe('Pruebas para las rutas de Usuario', () => {
//   it('Debería crear un nuevo usuario', async () => {
//     const newUser = {
//       idUsuario: 1,
//       nombreUsuario: 'darwin', // Cambiado a nombreUsuario
//       contrasena: 'Kaspers@2',
//       rol: 'empleado',
//       idColaborador: 2,
//     };

//     const response = await request.post('/saag/agregar-usuario').send(newUser);
//    // expect(response.statusCode).toBe(200);
//    // expect(response.body.data.nombreUsuario).toBe(newUser.nombreUsuario);
//   });

//   // Prueba para obtener todos los usuarios
//   it('Debería obtener todos los usuarios', async () => {
//     const response = await request.get('/saag/usuarios');
//    // expect(response.statusCode).toBe(200);
//    // expect(response.body.length).toBeGreaterThan(0);
//   });

//   // Prueba para obtener un usuario por ID
//   it('Debería obtener un usuario por ID', async () => {
//     const id = 1; 
//     const response = await request.get(`/saag/usuario/${id}`);
//    // expect(response.statusCode).toBe(200);
//    // expect(response.body.idUsuario).toBe(id);
//   });

//   // Prueba para actualizar un usuario por ID
//   it('Debería actualizar un usuario por ID', async () => {
//     const id = 1; 
//     const updatedUserData = {
//       idUsuario: 1,
//       nombreUsuario: 'Rogers', // Cambiado a nombreUsuario
//       contrasena: 'Scooby@21',
//       rol: 'usuario',
//       idColaborador: 2,
//     };

//     const response = await request.put(`/saag/actualizar-usuario/${id}`).send(updatedUserData);
//    // expect(response.statusCode).toBe(200);
//   });

//   // Prueba para eliminar un usuario por ID
//   it('Debería eliminar un usuario por ID', async () => {//este test da error porque no estoy logueado como admin
//     const id = 1;
//     const response = await request.delete(`/saag/eliminar-usuario/${id}`);
//     //expect(response.statusCode).toBe(200);
//   });
// });
