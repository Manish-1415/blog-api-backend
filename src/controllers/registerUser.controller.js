import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const registerUser = async (req , res , next) => {
  try {
    const { name, email, password } = req.body;

    const fields = [name, email, password];

    for (const field of fields) {
      if (!field || (typeof field === "string" && field.trim() === ""))
        throw new ApiError(408, "Please Provide All Fields");
    }

    const isUserAlreadyExist = await User.findOne({ email: email });

    if (isUserAlreadyExist)
      throw new ApiError(
        409,
        "User Already Created , Please Provide Right Credentials !"
      );

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log(user);

    return res
      .status(201)
      .json(new ApiResponse(201, "User Created Successfully", user));

  } catch (error) {
    // console.log("Something Went Wrong , while Creating User", error);
    next(error);
  }
};

export { registerUser };
