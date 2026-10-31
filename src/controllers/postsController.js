import {
  getAllPostsService,
  getPostByIdService,
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