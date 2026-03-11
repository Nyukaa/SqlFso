const router = require("express").Router();

const { User, Note } = require("../models");
const bcrypt = require("bcrypt");
// router.get("/", async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });
// to get all users + notes
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Note,
      attributes: {
        exclude: ["userId"],
      },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      name,
      passwordHash,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
