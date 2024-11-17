// Realizo importaciones

const mongoose = require('mongoose');
require('dotenv').config();
 

// Realizo la extracion de los env y los asigno a unas constantes
const name = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const cluster = process.env.DB_CLUSTER;
const URL = `mongodb+srv://${name}:${password}@${cluster}/${dbName}`;

// Realizo la conexion a la base de datos
const conexion = async () => {
    try {
        await mongoose.connect(URL);
  console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    }
    }

// exporto
module.exports = conexion;