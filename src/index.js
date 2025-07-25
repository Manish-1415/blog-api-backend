import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import connectDataBase from "./db/mongo_db_connect.js";

const port = process.env.PORT || 3000;

connectDataBase()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Our Backend Server Started Successfully on ${port} port !`);
      server.on("error", (error) => {
        console.log(error);
      });
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error :", err);
  });
