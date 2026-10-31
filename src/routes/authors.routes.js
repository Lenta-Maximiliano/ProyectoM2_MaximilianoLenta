import { Router } from "express";
import {
  getAuthors,
  getAuthor,
  createAuthorController,
} from "../controllers/authors.controller.js";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/", createAuthorController);

export default router;
