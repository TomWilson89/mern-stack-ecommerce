import { Router } from "express";

import ProductRoutes from "../../services/products/products.routes";

const router = Router();

router.use("/products", ProductRoutes);

export default router;
