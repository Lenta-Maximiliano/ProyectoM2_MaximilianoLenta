import { Router } from "express";
import { getAuthors } from "../controllers/authors.controller.js";

const router = Router();

router.get("/", getAuthors);

export default router;
