import { User } from "../models/user.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import jwt from "jsonwebtoken";
import { accessTokenGeneration } from "../utilitys/jwt.tokens.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const refreshTokenGenerate = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new ApiError(405, "Unauthorized Access");

    const isTokenValid = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // By this we are checking is token valid or not , in simple is it valid , and if yes then it provides the payload _id

    const findUserFromDB = await User.findById(isTokenValid._id);
    // Here we did not use findOne because for id's we simply do this , this also provides full object . And this avoid writing like if we use findOne({_id: isTokenValid._id}); So this is shorthand to find ID from DB.

    if (!findUserFromDB) throw new ApiError(404, "User Not Found !");

    if(findUserFromDB.refreshToken !== refreshToken) throw new ApiError(403 , "Refresh Tokens Did Not Match");

    const newAccessToken = accessTokenGeneration(findUserFromDB.email , findUserFromDB._id);

    if (!newAccessToken)
      throw new ApiError(
        500,
        "Error Occur On Server Side , While Generating Access Token"
      );


      return res
      .status(201)
      .json(new ApiResponse(201 , "Access Token Created Successfully !", {accessToken:newAccessToken}));

  } catch (error) {
    next(error);
  }
};

export { refreshTokenGenerate };
