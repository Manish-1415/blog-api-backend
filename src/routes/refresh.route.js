import { Router } from "express";
import { refreshTokenGenerate } from "../controllers/renewAccessToken.controller.js";

const router = Router();


router.route("/refresh").post(refreshTokenGenerate);

export {router};