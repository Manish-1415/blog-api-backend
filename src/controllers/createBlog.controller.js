import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    if (!title || title.trim() === "" || !content || content.trim() === "")
      throw new ApiError(400, "Please Provide Title and Content");

    const blogCreation = await Blog.create({
      title,
      content,
      author: author || "",
    });

    if (!blogCreation)
      throw new ApiError(500, "Error Occur While Creating an Entry in DB");

    return res
      .status(201)
      .json(new ApiResponse(201, "Blog Created Successfully!", blogCreation));
  } catch (error) {
    next(error);
  }
};

export { createBlog };
