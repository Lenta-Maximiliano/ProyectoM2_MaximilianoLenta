import pool from "../db/config.js";

export const getAllPostsService = async () => {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY id ASC"
  );

  return result.rows;
};

export const getPostByIdService = async (id) => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  return result.rows[0];
};