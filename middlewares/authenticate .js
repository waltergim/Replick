
require('dotenv').config();

const authenticate =  (req, res, next) => {
    const token =  req.header('x-auth-token');
    const adminToken = process.env.TOKEN 

     if (token !== adminToken) {
        return res.status(401).send({
             message: 'No estas autorizado para realizar esta accion',
             ok: false 
            
            })
            }
            next()
            }

    module.exports = authenticate 
