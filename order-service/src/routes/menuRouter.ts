import { Router } from "express";
import MenuController from "../controllers/MenuController";

const router = Router();

router.get("/", MenuController.getMenu);

export default router;
