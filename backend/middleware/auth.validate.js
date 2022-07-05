const { body, validationResult } = require("express-validator");
const db = require("../db/models");

module.exports = {
  registerValidation: [
    body("name").notEmpty().withMessage("Nama harus diisi"),
    body("email")
      .notEmpty()
      .withMessage("Email harus diisi")
      .isEmail()
      .withMessage("Email harus valid")
      .custom(async (value, { req }) => {
        const user = await db.User.findOne({
          where: { email: value },
        });
        if (user) {
          return Promise.reject("Email sudah terdaftar");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Password harus diisi")
      .isLength({ min: 5 })
      .withMessage("Password minimal 5 karakter"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password tidak sama");
      }
      return true;
    }),
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

  loginValidation: [
    body("email")
      .notEmpty()
      .withMessage("Email harus diisi")
      .isEmail()
      .withMessage("Email harus berupa email")
      .custom(async (value, { req }) => {
        const user = await db.User.findOne({
          where: { email: value },
        });
        if (user) {
          return Promise.reject("Email sudah terdaftar");
        }
        return true;
      }),
    body("password").notEmpty().withMessage("Password harus diisi"),
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
