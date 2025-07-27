import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    if (!blogId)
      throw new ApiError(408, "Please Provide Id, if u want blog from ID");

    const getBlogFromDBById = await Blog.findById(blogId).populate("author","name");

    if (!getBlogFromDBById)
      throw new ApiError(404, "Provided ID's Blog Not Present In the DB");

    return res
      .status(200)
      .json(new ApiResponse(200, "Sending Blog", getBlogFromDBById));
  } catch (error) {
    next(error);
  }
};

export { getBlogById };
