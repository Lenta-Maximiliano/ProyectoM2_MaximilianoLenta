import pool from "../db/config.js";

export const getAllAuthors = async () => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id ASC");

  return result.rows;
};

export const getAuthorById = async (id) => {
  const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);

  return result.rows[0];
};


export const createAuthor = async ({ name, email, bio }) => {
  const result = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, bio]
  );

  return result.rows[0];
};
