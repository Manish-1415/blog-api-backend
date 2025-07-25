import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const registerUser = async () => {
  const { name, email, password } = req.body;

  const fields = [name, email, password];

  for (const field of fields) {
    if (!field || field.trim() === "")
      throw new ApiError(408, "Please Provide All Fields");
  }
};

export { registerUser };
