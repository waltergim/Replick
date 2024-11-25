// importamos las dependencias necesarias
const Post = require("../models/Post");

// const createPost
const createPost = async (req, res) => {
  try {
    const { title, subtitle, content, image, role } = req.body;
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

    const post = new Post({
      title,
      subtitle,
      content,
      image,
      role,
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
    const postId = req.params.id;
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
    res.status(500).send({
      message: "Error al obtener el post",
      ok: false,
    });
  }
};

// recogemos todos los posts

const getPosts = async (req, res) => {
  try {
    const { role } = req.params;

    // Verificar si el role es válido
    const validRoles = ["primera", "acenso", "seleccion"];
    const limit = validRoles.includes(role) ? 15 : 3;

    // Consultar los posts con el límite definido
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
