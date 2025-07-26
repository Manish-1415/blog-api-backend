import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";
import {userLogin} from "../controllers/loginUser.controller.js";
import { logOutUser } from "../controllers/logOut.controller.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

router.route("/logout").post(logOutUser);
// Here we have to empty the entry from DB , and make cookie deleted., And POST request can have empty body not mandatory only by body it is POST req.

export default router;

