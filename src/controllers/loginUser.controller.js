import { User } from "../models/user.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";
import { accessTokenGeneration } from "../utilitys/jwt.tokens.js";
import { refreshTokenGeneration } from "../utilitys/jwt.tokens.js";

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || !password.trim() === "")
      throw new ApiError(409, "Please Provide All fields Correctly !");

    const isUserExist = await User.findOne({ email });
    // Ok , so here findOne finds whole object not true/false , it returns whole object that matches the credential.
    // That select will remove , password and refreshToken from the object , it is not good practice to include password and refreshToken ,so why
    // we using it here i mean why not at the end , because here we exclude this fields , now we only have to return the obj as response.

    if (!isUserExist)
      throw new ApiError(408, "Please Register the User First , then Login !");

    const isThisSameUser = await isUserExist.comparePassword(password);
    // Now if we get object , then we can directly call the comparePassword method because we define that method for Schema / instance
    // We only receive True or False from this , comparePassword return a Boolean value cause the bcrypt.compare() method returns true or false.
    // One thing is , we can use comparePassword method here , cause we have create this method for schema , and from DB we are simply calling a user entry / instance simply thats why we can directly use comparePassword() here directly.

    if (!isThisSameUser)
      throw new ApiError(401, "The provided credentials are wrong !");

    const accessToken = accessTokenGeneration(email, isUserExist._id);

    const refreshToken = refreshTokenGeneration(isUserExist._id);

    isUserExist.refreshToken = refreshToken;
    // Here we added this field inside mongoose schema

    await isUserExist.save({ validateBeforeSave: false });
    // By this i am saving the changes inside mongoDB , updating entry with refreshToken field.
    // By validateBeforeSave this means , dont check other fields simply update this entry inside DB.

    // isUserExist.select("-password -refreshToken");
    // This wont work , cause it is used only once while fetching querry to DB.

    isUserExist.password = undefined;
    isUserExist.refreshToken = undefined;
    // By undefined , it will only be undefined in here , it will not change inside real DB.

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, //Not accessed by client side JS
        secure: false, //Only accessed by https:// request not http://
        sameSite: "lax", //By this we can allow like same domain want to exchange / different domain needs to send cookies. , Use none when secure is true , none , will make different domains to send cookie ,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds , GPT whenever need
      })
      .json(
        new ApiResponse(200, "First Login Successful", {
          accessToken,
          user: isUserExist,
        })
      );
    // Ok so here ,we simply wrap data inside an Object but why ?
    //  Because in ApiResponse we have 3 parameters , statusCode , message , data , but here we are sending 2 things , then it will not include isUserExist if we give direct 4 parameters , now by wrapping 2 datas inside 1 obj , we can send multiple datas.
    // In simple we cannot send multiple arguments if we have minimum parameters so that's why wrap inside an object
  } catch (error) {
    next(error);
  }
};
