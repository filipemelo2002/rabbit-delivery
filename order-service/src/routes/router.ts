import { Router } from "express";

import OrderRouter from "./orderRouter";

const router = Router();

router.use("/order", OrderRouter);

export default router;
