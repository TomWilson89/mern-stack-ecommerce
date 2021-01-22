import { Router } from "express";
import ProductController from "./products.controller";

const router = Router();

router.get("/", ProductController.list);

router.get("/:id", ProductController.show);

export default router;
