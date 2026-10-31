import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
} from "../controllers/postsController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/author/:authorId", getPostsByAuthor);
router.get("/:id", getPostById);
router.post("/", createPost);

export default router;