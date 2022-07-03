const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/models");

class AuthController {
  index = async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: ["id", "name", "email"],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.User.create({ name, email, password: hashedPassword });
      res.status(200).json({ message: "Your account has been created" });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      });

      const passwordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatched) {
        return res.status(400).json({ message: "Something wrong" });
      }

      const token = {
        userId: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2m",
      });

      const refreshToken = jwt.sign(token, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      user.refresh_token = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(404).json({ message: "No email found" });
    }
  };

  logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await db.User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.sendStatus(204);

    await db.User.update(
      { refresh_token: null },
      {
        where: { id: user.id },
      }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  };
}

module.exports = new AuthController();
