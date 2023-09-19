const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Define las rutas del API
app.use('/saag', require('./routes/solicitud.routes'));

// Sincroniza la base de datos
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
