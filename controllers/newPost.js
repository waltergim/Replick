// importamos las dependencias necesarias
require("dotenv").config();
const Post = require("../models/Post");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
  try {
    const { title, subtitle, content, role } = req.body;
    
    const pass = process.env.PASS

   const { crear } = req.params ;

   if (pass == crear) {
    return res.status(403).send({
      message: "Clave incorrecta",
      ok: false,
    });
   }

    const file = req.file;
    let image = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, image);

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const uploadsImage = await cloudinary.uploader.upload(image);

    if (!title || !subtitle || !content || !image || !role) {
      return res.status(400).send({
        message: "Faltan datos por enviar",
        ok: false,
      });
    }

    const titleExists = await Post.findOne({ title });
    if (titleExists) {
      return res.status(400).send({
        message: "El título ya existe",
        ok: false,
      });
    }

    image = uploadsImage.secure_url;

    const post = new Post({
      title,
      subtitle,
      content,
      image,
      private: true,
      role: role.toLowerCase(),
    });

    await post.save();

    return res.status(201).send({
      message: "Post creado con éxito",
      post,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error al crear el post",
      ok: false,
    });
  }
};

// updateamos los post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, subtitle, content, image } = req.body;
    if (!title || !subtitle || !content || !image) {
      return res.status(400).send({
        message: "Faltan datos por enviar",
        ok: false,
      });
    }

    const post = await Post.findByIdAndUpdate(postId, {
      title,
      subtitle,
      content,
      image,
    });

    if (!post) {
      return res.status(404).send({
        message: "Post no encontrado",
        ok: false,
      });
    }

    return res.status(200).send({
      message: "Post actualizado con éxito",
      post,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error al actualizar el post",
      ok: false,
    });
  }
};

// recuperamos un post en particular
const getPost = async (req, res) => {
  try {
    const postId = req.params.id.trim(); // Limpia espacios y saltos de línea si los hay

    // Validar que el ID sea un ObjectId válido
    if (!postId) {
      return res.status(400).send({
        message: "ID inválido proporcionado",
        ok: false,
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({
        message: "Post no encontrado",
        ok: false,
      });
    }

    return res.status(200).send({
      message: "Post encontrado con éxito",
      post,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error al obtener el post",
      ok: false,
    });
  }
};

// recogemos todos los posts

const getPosts = async (req, res) => {
  try {
    const { role } = req.params;

    // Si no se proporciona `role`, devolver los últimos posts generales
    if (!role) {
      const posts = await Post.find().limit(6).sort({ _id: -1 });
      return res.status(200).send({
        message: "Posts encontrados con éxito",
        posts,
        ok: true,
      });
    }

    // Si se proporciona `role`, verificar que sea válido
    const validRoles = ["primera", "ascenso", "internacional", "seleccion"];
    if (!validRoles.includes(role)) {
      return res.status(400).send({
        message: "Role no válido",
        ok: false,
      });
    }

    // Consultar los posts según el `role`
    const limit = role === "primera" ? 15 : 3; // Ajustar el límite según el role
    const posts = await Post.find({ role }).limit(limit).sort({ _id: -1 });

    return res.status(200).send({
      message: "Posts encontrados con éxito",
      posts,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error al obtener los posts",
      ok: false,
    });
  }
};

 

// Eliminamos los post selecionados por el id
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({
        message: "Post no encontrado",
        ok: false,
      });
    }
    return res.status(200).send({
      message: "Post eliminado con éxito",
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error al eliminar el post",
      ok: false,
    });
  }
};

// exportamos las funciones
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
 
};
