import { Router } from "express";
import { createBlog } from "../controllers/createBlog.controller.js";
import { deleteBlog } from "../controllers/deleteBlog.controller.js";
import { getAllBlogs } from "../controllers/getAllBlogs.controller.js";
import { getBlogById } from "../controllers/getBlogById.controller.js";
import { updateBlog } from "../controllers/updateBlog.controller.js";

const router = Router();

router.route("/").post(createBlog);

router.route("/:id").delete(deleteBlog);

router.route("/").get(getAllBlogs);

router.route("/:id").get(getBlogById);

router.route("/:id").patch(updateBlog);

export { router };
