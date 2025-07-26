import jwt from "jsonwebtoken";
import { ApiError } from "../utilitys/ApiError.js";

const verifyAuth = (req, res, next) => {
  try {
    const ifTokenExist = req.headers.authorization;
    // For checking authentication , we have to get access token for it. 

    if (!ifTokenExist)
      throw new ApiError(
        401,
        "No token Provided , Please provide correct Token"
      );

    const accessToken = ifTokenExist.split(" ")[1];


    const decodedPayloadFromVerify = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    // In simple words , what this does is , it simply verify the access token if it is valid and if it gives payload (here payload means the data we provide while jwt.sign() that is payload.) then simply attach that payload with request , so if next middleware need it they can simply get that.
    


    if (decodedPayloadFromVerify) req.user = decodedPayloadFromVerify;
    // So here we check , if it is true means if verify() returns an payload then it is true , so when it is true , then add new thing to the req,
    // which is req.user = that payload we get , and then next() , means if any middleware needs the payload info for processing or anything now they also can get from req.user simply , they dont need to go through from verify() everytime.  

    next();
    // if we using any middleware , then we have to provide next at the end , because if we dont do it will stuck forever , it will not reach till the controller function if we dont give next() ; Best practice to give next() in each middleware.

  } catch (error) {
    next(error);
  }
};

export { verifyAuth };
