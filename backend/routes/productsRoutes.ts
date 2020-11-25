import * as express from "express";
import { fetchProducts } from "../controllers/productsController";
const router = express.Router();

router.get("/", fetchProducts);

router.get("/:id", fetchProducts);

export { router };
