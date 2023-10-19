    const app = require('../index');
    const supertest = require('supertest');
    const request = supertest(app);

    describe('Pruebas para las rutas de Usuario', () => {
    it('Debería crear un nuevo usuario', async () => {
        const newUser = {
        NomUsuario: 'darwin',
        contrasena: 'Kaspers@2',
        rol: 'empleado',
        };

        const response = await request.post('/saag/usuario').send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.NomUsuario).toBe(newUser.NomUsuario);
    });

    // Prueba para obtener todos los usuarios
    it('Debería obtener todos los usuarios', async () => {
        const response = await request.get('/saag/usuarios');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Prueba para obtener un usuario por ID
    it('Debería obtener un usuario por ID', async () => {
        const id = 1; 
        const response = await request.get(`/saag/usuario/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.idUsuario).toBe(id);
    });

    // Prueba para actualizar un usuario por ID
    it('Debería actualizar un usuario por ID', async () => {
        const id = 1; 
        const updatedUserData = {
        NomUsuario: 'Rogers',
        contrasena: 'Scooby',
        rol: 'usuario',
        };

        const response = await request.put(`/saag/usuario/${id}`).send(updatedUserData);
        expect(response.statusCode).toBe(200);
        expect(response.body.NomUsuario).toBe(updatedUserData.NomUsuario);
    });

    // Prueba para eliminar un usuario por ID
    it('Debería eliminar un usuario por ID', async () => {
        const id = 1;
        const response = await request.delete(`/saag/usuario/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('El usuario ha sido eliminado correctamente');
    });
    });

