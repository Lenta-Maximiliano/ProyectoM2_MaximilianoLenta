import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
} from "../services/authors.service.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    res.status(200).json(authors);
  } catch (error) {
    console.error("Error al obtener autores:", error.message);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await getAuthorById(id);

    if (!author) {
      return res.status(404).json({
        error: "Autor no encontrado",
      });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error("Error al obtener el autor:", error.message);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const createAuthorController = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !name.trim() ||
      !email.trim()
    ) {
      return res.status(400).json({
        error: "El nombre y el email son obligatorios",
      });
    }

    const newAuthor = await createAuthor({ name, email, bio });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error("Error al crear autor:", error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        error: "El email ya está registrado",
      });
    }

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};
