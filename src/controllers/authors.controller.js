import { getAllAuthors, getAuthorById } from "../services/authors.service.js";

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
