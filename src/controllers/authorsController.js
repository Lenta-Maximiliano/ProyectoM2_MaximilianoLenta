import {
  getAllAuthorsService,
  getAuthorByIdService,
  createAuthorService,
  updateAuthorService,
  deleteAuthorService,
} from "../services/authorsService.js";
import { notFound, badRequest, conflict } from "../utils/error.js";
import { validarNombre, validarEmail } from "../utils/validators.js";

export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthorsService();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await getAuthorByIdService(id);

    if (!author) {
      throw notFound("Autor no encontrado");
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    const errorNombre = validarNombre(name);

    if (errorNombre) {
      throw badRequest(errorNombre);
    }

    const errorEmail = validarEmail(email);

    if (errorEmail) {
      throw badRequest(errorEmail);
    }

    const newAuthor = await createAuthorService({
      name: name.trim(),
      email: email.trim(),
      bio,
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.code === "23505") {
      return next(conflict("El email ya está registrado"));
    }

    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    const errorNombre = validarNombre(name);

    if (errorNombre) {
      throw badRequest(errorNombre);
    }

    const errorEmail = validarEmail(email);

    if (errorEmail) {
      throw badRequest(errorEmail);
    }

    const updatedAuthor = await updateAuthorService(id, {
      name: name.trim(),
      email: email.trim(),
      bio,
    });

    if (!updatedAuthor) {
      throw notFound("Autor no encontrado");
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    if (error.code === "23505") {
      return next(conflict("El email ya está registrado"));
    }

    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAuthor = await deleteAuthorService(id);

    if (!deletedAuthor) {
      throw notFound("Autor no encontrado");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};