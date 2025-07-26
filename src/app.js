import express from "express";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(cookieParser());
// This is for parsing cookies , we dont need to manually set or get cookie from frontend , but we do need cookie-parser to parse cookie from req
// Now u can access cookies by req.cookie.cookieName


import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

export {app}