import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
// import { ApiError } from "../utilitys/ApiError";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    refreshToken: {           //Added after generation of Access & refresh token , We only need refresh token to store in DB , bcause it's expiry 
      type: String,          // long enough to expire , so for re-generating access token store in DB , and also when it expires we only have to 
    },                      // create new refresh token and save in DB
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);
