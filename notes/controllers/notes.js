const notesRouter = require("express").Router();
const { Note, User } = require("../models");
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  if (!req.note) {
    return res.status(404).end();
  }
  next();
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

notesRouter.get("/", async (req, res) => {
  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
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
    const user = await User.findOne();
    const note = await Note.create({
      ...req.body,
      date: new Date(),
      userId: user.id,
    });
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
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
