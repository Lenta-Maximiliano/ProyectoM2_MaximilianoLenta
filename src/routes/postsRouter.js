import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
} from "../controllers/postsController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/author/:authorId", getPostsByAuthor);
router.get("/:id", getPostById);

export default router;