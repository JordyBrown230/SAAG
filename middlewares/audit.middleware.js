const {create} = require('../controllers/auditoria.controller')


const audit = async (req, res, next) => {

        try{  
            
            datos = req.datos
            await create(req, res, datos);

        }catch(error) {
            console.error(error);
          }
    next();
    };


module.exports = { audit };