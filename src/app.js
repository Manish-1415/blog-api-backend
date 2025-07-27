import express from "express";
const app = express();

import cookieParser from "cookie-parser";


app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(cookieParser());
// This is for parsing cookies , we dont need to manually set or get cookie from frontend , but we do need cookie-parser to parse cookie from req
// Now u can access cookies by req.cookie.cookieName


import userRouter from "./routes/user.route.js";
import refreshRouter from "./routes/refresh.route.js"
import blogRouter from "./routes/blog.route.js";

app.use("/api/v1/users", userRouter);

app.use("/auth", refreshRouter);

app.use("/api/v1/blogs", blogRouter);




app.use(error.middleware.js);




export {app}