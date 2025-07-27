import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    if (!blogId) throw new ApiError(400, "Please Provide Id");
    // No need of this , but its good to check this also.

    const deleteBlogByItsId = await Blog.findByIdAndDelete(blogId);
    // there are like ,deleteMany(here we filter the condition) , deleteOne(delete first document that matches the condition here);

    if (!deleteBlogByItsId)
      throw new ApiError(404, "Blog not found for deleting");

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Blog Deleted Successfully !", deleteBlogByItsId)
      );
  } catch (error) {
    next(error);
  }
};

export { deleteBlog };
