import { Router } from "express";
import { refreshTokenGenerate } from "../controllers/refreshToken.controller";

const router = Router();


router.route("/refresh").post(refreshTokenGenerate);
