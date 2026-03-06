const notesRouter = require("express").Router();
const Note = require("../models/note");

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
notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    res.json(note);
  } else {
    res.status(404).end();
  }
});
notesRouter.put("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});
module.exports = notesRouter;
