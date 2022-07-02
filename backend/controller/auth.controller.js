const db = require("../db/models");
const bcrypt = require("bcrypt");

class AuthController {
  index = async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  register = async (req, res) => {
    const { name, email, password } = req.body;
    res.send("ji");
    // try {
    //   const salt = await bcrypt.genSalt();
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   await db.User.create({ name, email, password: hashedPassword });
    //   res.status(200).json({ message: "Your account has been created" });
    // } catch (error) {
    //   res.status(400).json(error);
    // }
  };
}

module.exports = new AuthController();
