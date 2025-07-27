import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    if (!blogId)
      throw new ApiError(400, "Please provide ID of Blog You want to change");

    const { title, content } = req.body;
    // Here assuming we are getting to fields to change , title and content and it will be done by PATCH request.

    if (!title || title.trim() === "" || !content || content.trim() === "")
      throw new ApiError(400, "Please Provide field that u want to Updated ");

    const findBlogByID = await Blog.findById(blogId);

    if (!findBlogByID) throw new ApiError(404, "Blog not found");

    findBlogByID.title = title.trim();
    findBlogByID.content = content.trim();

    // Saving updated fields to the DB

    const savingBlog = await findBlogByID.save({ validateBeforeSave: false });

    if (!savingBlog)
      throw new ApiError(500, "Internal Error Occur while saving Blog in DB");

    return res
      .status(202)
      .json(new ApiResponse(202, "Blog Updated Successfully!", savingBlog));
  } catch (error) {
    next(error);
  }
};

export { updateBlog };
