import { getAllAuthors } from "../services/authors.service.js";

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
