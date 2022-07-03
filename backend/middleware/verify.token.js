const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const header = req.headers["authorization"];
    const accessToken = header && header.split(" ")[1];

    if (accessToken === null) return res.sendStatus(401);

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decodedToken) => {
        if (error) return res.sendStatus(403);

        req.email = decodedToken.email;
        next();
      }
    );
  },
};
