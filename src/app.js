import express from "express";

const app = express();


app.use(express.json());

app.use(express.urlencoded({extended : true}));


import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

export {app}