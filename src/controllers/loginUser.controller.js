import { User } from "../models/user.model.js";
import { ApiError } from "../utilitys/ApiError.js";

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || !password.trim() === "")
      throw new ApiError(409, "Please Provide All fields Correctly !");

    const isUserExist = await User.findOne({ email }); // Ok here i made mistake , now corrected , i miss the obj {} , we have to give , cause we are finding an Obj.

    // Here isUserExist will return whole object , not true or false  , by this we get the similar object which have same email

    if (!isUserExist)
      throw new ApiError(408, "Please Register the User First , then Login !");

    const isThisSameUser = await isUserExist.comparePassword(password);
    // Now if we get object , then we can directly call the comparePassword method because we define that method for Schema / instance

    if (!isThisSameUser)
      throw new ApiError(401, "The provided credentials are wrong !");
  } catch (error) {
    next(error);
  }
};
