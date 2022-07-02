const { body, validationResult } = require("express-validator");

module.exports = {
  registerValidation: [
    body("name").notEmpty().withMessage("Nama harus diisi"),
    body("email")
      .notEmpty()
      .withMessage("Email harus diisi")
      .isEmail()
      .withMessage("Email harus valid"),
    body("password")
      .notEmpty()
      .withMessage("Password harus diisi")
      .isLength({ min: 5 })
      .withMessage("Password minimal 5 karakter"),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject();
        }
        return true;
      })
      .withMessage("Password tidak sama"),
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
