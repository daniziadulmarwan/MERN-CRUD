const jwt = require("jsonwebtoken");
const db = require("../db/models");

class RefreshToken {
  index = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);

      const user = await db.User.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decodedToken) => {
          if (error) return res.sendStatus(403);

          const token = {
            userId: user.id,
            name: user.name,
            email: user.email,
          };

          const newAccessToken = jwt.sign(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "2m",
            }
          );

          res.json({ newAccessToken });
        }
      );
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new RefreshToken();
