import jwt from "jsonwebtoken";

export const accessTokenGeneration = (email , _id) => {
  return jwt.sign(
    {
      email: email,
      _id: _id
    },

    process.env.ACCESS_TOKEN_SECRET,

    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const refreshTokenGeneration = (_id) => {
  return jwt.sign(
    {
      _id: _id,
    },
    process.env.REFRESH_TOKEN_SECRET,

    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
