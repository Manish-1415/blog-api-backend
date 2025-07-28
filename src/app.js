import express from "express";
const app = express();

import cookieParser from "cookie-parser";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// This is for parsing cookies , we dont need to manually set or get cookie from frontend , but we do need cookie-parser to parse cookie from req
// Now u can access cookies by req.cookie.cookieName

import userRouter from "./routes/user.route.js";
import {router as refreshRouter} from "./routes/refresh.route.js";
import { router as blogRouter } from "./routes/blog.route.js";

app.use("/api/v1/users", userRouter);

app.use("/auth", refreshRouter);

app.use("/api/v1/blogs", blogRouter);

// We import and use error middleware at the last
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(errorMiddleware);

export { app };
