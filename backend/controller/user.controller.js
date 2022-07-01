const db = require("../db/models");

class UserController {
  index = async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  show = async (req, res) => {
    try {
      const user = await db.User.findOne({ where: { id: req.params.id } });
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  store = async (req, res) => {
    try {
      await db.User.create(req.body);
      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  update = async (req, res) => {
    try {
      await db.User.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: "User updated",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  destroy = async (req, res) => {
    try {
      await db.User.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: "User deleted",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new UserController();
