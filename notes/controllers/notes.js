const notesRouter = require("express").Router();
const Note = require("../models/note");
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  if (!req.note) {
    return res.status(404).end();
  }
  next();
};
notesRouter.get("/", async (req, res) => {
  const notes = await Note.findAll();
  console.log("Getting all notes", JSON.stringify(notes, null, 2));
  //console.log(notes.map((n) => n.toJSON())); the same log as above but more readable
  res.json(notes);
});

notesRouter.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      date: new Date(),
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
