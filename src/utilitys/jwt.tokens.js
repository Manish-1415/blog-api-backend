import jwt from "jsonwebtoken";

export const accessTokenGeneration = (name, email) => {
  return jwt.sign(
    {
      name: name,
      email: email,
    },

    process.env.ACCESS_TOKEN_SECRET,

    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const refreshToken = (_id) => {
  return jwt.sign(
    {
      _id: _id,
    },
    process.env.REFRESH_TOKEN_SECRET,

    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
