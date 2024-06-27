import { Router } from "express";
import * as controller from "../controllers";

const router = Router()

router.use('/',controller.index)

export default router

