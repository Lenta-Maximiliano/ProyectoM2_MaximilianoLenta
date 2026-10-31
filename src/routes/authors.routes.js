import { Router } from "express";
import { getAuthors, getAuthor } from "../controllers/authors.controller.js";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);

export default router;
