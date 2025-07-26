import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";
import {userLogin} from "../controllers/loginUser.controller.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

router.route("/logout").post()

export default router;

