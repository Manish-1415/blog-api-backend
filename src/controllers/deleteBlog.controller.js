import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    if (!blogId) throw new ApiError(400, "Please Provide Id");
    // No need of this , but its good to check this also.

    // if(blogId !== req.user._id) throw new ApiError(400, "Unauthorized Action , You dont have access to manipulate anyone's data");

    const findBlogByID = await Blog.findById(blogId);

    if (!findBlogByID) throw new ApiError(404, "Blog Not Found");

    if (findBlogByID.author.toString() !== req.user._id.toString())
      throw new ApiError(
        400,
        "Unauthorized Action , You dont have access to delete the blogs of other user"
      );
    //   Here we are validating that , only the author have the access to manipulate the blogs of itself , and not others , So i face a issue where the other user who have access token can simply manipulate , update / delete the data of other user. So here i simply validate / check by the authors id which is the User objects id , and the req.user._id which is also the User object id , it simply means now the user who have created the blog can update / delete the blogs.



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
