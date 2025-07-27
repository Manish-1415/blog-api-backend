import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const getAllBlogs = async (req, res, next) => {
  try {
    const getBlogsFromDB = await Blog.find();

    if (getBlogsFromDB.length <= 0) throw new ApiError(404, "No Blogs Present in DB");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "This are the Blogs Present in the DB",
          getBlogsFromDB
        )
      );
  } catch (error) {
    next(error);
  }
};

export { getAllBlogs };
