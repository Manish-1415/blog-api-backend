import { Router } from "express";
import { refreshTokenGenerate } from "../controllers/renewAccessToken.controller";

const router = Router();


router.route("/refresh").post(refreshTokenGenerate);
