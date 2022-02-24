const JWT = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  let token = req.header("auth-token");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = await JWT.verify(token, process.env.TOKEN_SECRET);
    //@ts-ignore
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
};

module.exports = checkAuth;
