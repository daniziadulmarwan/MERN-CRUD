const path = require("path");
const fs = require("fs");
const db = require("../db/models");

class StudentController {
  index = async (req, res) => {
    try {
      const students = await db.Student.findAll();
      res.status(200).json({
        data: students,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  show = async (req, res) => {
    try {
      const student = await db.Student.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        data: student,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  store = async (req, res) => {
    try {
      if (req.files === null)
        return res.status(400).json({ msg: "No file uploaded" });

      const date = new Date();

      const name = req.body.name;
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + date.getTime() + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", "jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid images" });

      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5MB" });

      file.mv(`./public/images/${fileName}`, async (error) => {
        if (error) return res.status(422).json({ msg: error.message });
        try {
          await db.Student.create({
            name: name,
            image: fileName,
            url: url,
          });
          res.status(201).json({
            message: "Student has been created",
          });
        } catch (error) {
          res.status(400).json(error);
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  update = async (req, res) => {
    const student = await db.Student.findOne({
      where: { id: req.params.id },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const date = new Date();

    let fileName = "";
    if (req.files === null) {
      fileName = student.image;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + date.getTime() + ext;
      const allowedType = [".png", ".jpg", "jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid images" });

      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5MB" });

      const filePath = `./public/images/${student.image}`;
      fs.unlinkSync(filePath);

      file.mv(`./public/images/${fileName}`, (error) => {
        if (error) return res.status(422).json({ msg: error.message });
      });
    }

    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
      await db.Student.update(
        { name: name, image: fileName, url: url },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).json({
        message: "Student has been updated",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  destroy = async (req, res) => {
    const student = await db.Student.findOne({
      where: { id: req.params.id },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    try {
      const filePath = `./public/images/${student.image}`;
      fs.unlinkSync(filePath);
      await db.Student.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Student has been deleted" });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new StudentController();
