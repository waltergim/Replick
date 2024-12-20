// Realizo importaciones
const express = require('express');
const conexion = require('./config/conexion');
const cors = require('cors');
const path = require('path');

// Realizo la configuracion de la ruta y la app
const app = express();
const port = 3100;

// configuraciones extrass

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Ruta de prueba
app.get('/', (req, res) => {
 res.send('Hello World!');
 });


app.use('/api/post', require('./routers/newPost'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Conecto la app 
 app.listen(port, () => {
    console.log(`La app esta conectada en el servidor http://localhost:${port}`)
    conexion()
    
 });