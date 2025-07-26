import { User } from "../models/user.model.js";
import { ApiError } from "../utilitys/ApiError.js";
import { ApiResponse } from "../utilitys/ApiResponse.js";

const logOutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const ifUserAlreadyExist = await User.findOne({ refreshToken });

    if (!ifUserAlreadyExist)
      throw new ApiError(
        405,
        "Invalid Credentials! Please Provide Correct Credentials"
      );

    ifUserAlreadyExist.refreshToken = "";
    // First we are making this field empty inside mongoose

    await ifUserAlreadyExist.save({ validateBeforeSave: false });
    // now here we are making changes in DB. Here the above change will store now.

    ifUserAlreadyExist.password = undefined;
    ifUserAlreadyExist.refreshToken = undefined;

    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 0,
      })
      .json(
        new ApiResponse(202, "User Successfully Logged-Out", ifUserAlreadyExist)
      );
    // TO Delete cookie simply provide the 3 values as same as setting cookie , but provide MaxAge:0 , now it will immediatedtly delete the cookie.
  } catch (error) {
    next(error);
  }
};

export { logOutUser };
