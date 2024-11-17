 // importo dependencias necesarias 

 const { validationResult  } = require('express-validator')
 
//  creamos una funcion para validar los datos
 const validarDatos = (req, res, next) => {
    
    const errores = validationResult(req);
    //  si hay errores 
    if (!errores.isEmpty()) {
        return res.status(400).json({ 
            errores: errores.array(),
            ok : false
        
        });
  
        }

       
        next();
 
        }

//  exportamos los datos 
module.exports = validarDatos;