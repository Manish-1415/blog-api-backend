import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model.js";

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },

  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
