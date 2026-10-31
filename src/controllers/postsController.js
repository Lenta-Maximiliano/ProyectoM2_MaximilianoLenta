import {
  getAllPostsService,
  getPostByIdService,
  getPostsByAuthorService,
  createPostService,
  updatePostService,
} from "../services/postsService.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error.message);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await getPostByIdService(id);

    if (!post) {
      return res.status(404).json({
        error: "Publicación no encontrada",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error al obtener publicación:", error.message);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const posts = await getPostsByAuthorService(authorId);

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener publicaciones del autor:", error.message);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim() ||
      author_id === undefined ||
      author_id === null
    ) {
      return res.status(400).json({
        error: "El título, el contenido y el ID del autor son obligatorios",
      });
    }

    const post = await createPostService({
      title,
      content,
      author_id,
      published,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error al crear publicación:", error.message);

    if (error.code === "23503") {
      return res.status(400).json({
        error: "El autor indicado no existe",
      });
    }

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author_id, published } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim() ||
      author_id === undefined ||
      author_id === null ||
      typeof published !== "boolean"
    ) {
      return res.status(400).json({
        error: "El título, el contenido, el ID del autor y el estado de publicación son obligatorios",
      });
    }

    const post = await updatePostService(id, {
      title,
      content,
      author_id,
      published,
    });

    if (!post) {
      return res.status(404).json({
        error: "Publicación no encontrada",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error al actualizar publicación:", error.message);

    if (error.code === "23503") {
      return res.status(400).json({
        error: "El autor indicado no existe",
      });
    }

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};