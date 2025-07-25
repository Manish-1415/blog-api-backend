import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDataBase = async () => {
    try {
        const connectDB = await mongoose.connect(`${process.env.MONGODB_URL} / ${dbName}`);
        console.log("Backend Connected with the Database Successfully !", connectDB.connection.host);
    } catch (error) {
        console.log("Error occurred while connecting backend with DB",error);
        process.exit(1);
    }
}

export default connectDataBase;