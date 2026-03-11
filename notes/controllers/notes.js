const notesRouter = require("express").Router();
const tokenExtractor = require("../middleware/tokenExtractor");
const { Note, User } = require("../models");
const { Op } = require("sequelize");
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  if (!req.note) {
    return res.status(404).end();
  }
  next();
};

notesRouter.get("/", async (req, res) => {
  const where = {};
  if (req.query.important) {
    where.important = req.query.important === "true";
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    };
  }
  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(notes);
});

// notesRouter.post("/", async (req, res) => {
//   try {
//     const note = await Note.create({
//       ...req.body,
//       date: new Date(),
//     });

//     res.json(note);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });
notesRouter.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const note = await Note.create({
      ...req.body,
      date: new Date(),
      userId: user.id,
    });

    res.json(note);
  } catch (error) {
    res.status(400).json({ error });
  }
});

notesRouter.get("/:id", noteFinder, async (req, res) => {
  res.json(req.note);
});

notesRouter.put("/:id", noteFinder, async (req, res) => {
  req.note.important = req.body.important;
  await req.note.save();
  res.json(req.note);
});
notesRouter.delete("/:id", noteFinder, async (req, res) => {
  await req.note.destroy();
  res.json(req.note);
});

module.exports = notesRouter;
