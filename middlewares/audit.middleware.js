const {create} = require('../controllers/auditoria.controller')


const audit = async (req, res, next) => {

        try{     

            await create(req, res);

        }catch(error) {
            console.error(error);
          }
    next();
    };


module.exports = { audit };