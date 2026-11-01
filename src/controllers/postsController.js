import {
  getAllPostsService,
  getPostByIdService,
  getPostsByAuthorService,
  createPostService,
  updatePostService,
  deletePostService,
} from "../services/postsService.js";
import { notFound, badRequest } from "../utils/error.js";
import {
  validarTitulo,
  validarContenido,
  validarAuthorId,
} from "../utils/validators.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await getPostByIdService(id);

    if (!post) {
      throw notFound("Publicación no encontrada");
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    const posts = await getPostsByAuthorService(authorId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;

    const errorTitulo = validarTitulo(title);

    if (errorTitulo) {
      throw badRequest(errorTitulo);
    }

    const errorContenido = validarContenido(content);

    if (errorContenido) {
      throw badRequest(errorContenido);
    }

    const errorAuthorId = validarAuthorId(author_id);

    if (errorAuthorId) {
      throw badRequest(errorAuthorId);
    }

    const post = await createPostService({
      title: title.trim(),
      content: content.trim(),
      author_id,
      published,
    });

    res.status(201).json(post);
  } catch (error) {
    if (error.code === "23503") {
      return next(badRequest("El autor indicado no existe"));
    }

    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author_id, published } = req.body;

    const errorTitulo = validarTitulo(title);

    if (errorTitulo) {
      throw badRequest(errorTitulo);
    }

    const errorContenido = validarContenido(content);

    if (errorContenido) {
      throw badRequest(errorContenido);
    }

    const errorAuthorId = validarAuthorId(author_id);

    if (errorAuthorId) {
      throw badRequest(errorAuthorId);
    }

    if (typeof published !== "boolean") {
      throw badRequest("El estado de publicación debe ser verdadero o falso");
    }

    const post = await updatePostService(id, {
      title: title.trim(),
      content: content.trim(),
      author_id,
      published,
    });

    if (!post) {
      throw notFound("Publicación no encontrada");
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.code === "23503") {
      return next(badRequest("El autor indicado no existe"));
    }

    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await deletePostService(id);

    if (!post) {
      throw notFound("Publicación no encontrada");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};