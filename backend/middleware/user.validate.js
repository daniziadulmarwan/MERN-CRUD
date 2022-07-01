const { body, param, validationResult } = require("express-validator");
const db = require("../db/models");

module.exports = {
  userValidate: [
    body("name").notEmpty().withMessage("Nama harus diisi").isString(),
    body("email")
      .notEmpty()
      .withMessage("Email tidak boleh kosong")
      .isString()
      .isEmail()
      .withMessage("Email harus benar"),
    body("gender").notEmpty().isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Error",
          error: errors.array(),
        });
      }

      next();
    },
  ],

  userParamsValidate: [
    param("id")
      .notEmpty()
      .bail()
      .withMessage("No params found")
      .isNumeric()
      .bail()
      .custom(async (value, { req }) => {
        const checking = await db.User.findOne({ where: { id: value } });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("User not found"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Error",
          error: errors.array(),
        });
      }

      next();
    },
  ],
};
