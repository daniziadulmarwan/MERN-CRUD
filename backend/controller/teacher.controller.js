const { Op } = require("sequelize");
const db = require("../db/models");

class TeacherController {
  index = async (req, res) => {
    const lastId = parseInt(req.query.last_id) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";

    let result = [];
    if (lastId < 1) {
      const results = await db.Teacher.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        limit: limit,
        order: [["id", "DESC"]],
      });
      result = results;
    } else {
      const results = await db.Teacher.findAll({
        where: {
          id: {
            [Op.lt]: lastId,
          },
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        limit: limit,
        order: [["id", "DESC"]],
      });
      result = results;
    }

    res.json({
      result: result,
      lastId: result.length ? result[result.length - 1].id : 0,
      hasMore: result.length >= limit ? true : false,
    });
  };
}

module.exports = new TeacherController();
