import pool from "../db/config.js";

export const getAllAuthors = async () => {
  const result = await pool.query(
    "SELECT * FROM authors ORDER BY id ASC"
  );

  return result.rows;
};
