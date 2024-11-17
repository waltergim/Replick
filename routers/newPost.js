// importo dependencias necesarias 
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
} = require("../controllers/newPost");

const { check } = require("express-validator");

const express = require("express");

const validarDatos = require("../middlewares/validarDatos");
const authenticate = require("../middlewares/authenticate ");

// creo el router para poder realizar las rutas
const router = express.Router();

// creo las rutas para el servidor
router.get("/", getPosts);

router.get("/:id", getPost);




// rutas protegidas
router.post(
  "/new",
// se realiza una small conprovacion de datos
  [
    check("title", "El titulo es obligatirio").not().isEmpty(),
    check("subtitle", "El subtitle es obligatoria").not().isEmpty(),
    check("content", "El contenido es obligatorio").not().isEmpty(),
    check("image", "La imagen es obligatoria").not().isEmpty(),
  ],
// se validan los datos
  validarDatos
  ,
// se valida el token
  authenticate
  ,
  createPost
);

router.put("/:id",authenticate, updatePost);

router.delete("/:id",authenticate, deletePost);


// se exportan las rutas para poder utilizarlas en otro archivo
module.exports = router;
