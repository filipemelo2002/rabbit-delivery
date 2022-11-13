import { Router } from "express";

import OrderRouter from "./orderRouter";
import MenuRouter from "./menuRouter";

const router = Router();

router.use("/order", OrderRouter);
router.use("/menu", MenuRouter);

export default router;
