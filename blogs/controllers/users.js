const router = require("express").Router();

const { User, Blog } = require("../models");
const bcrypt = require("bcrypt");
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
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
//
router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  });

  if (!user) {
    return res.status(404).end();
  }

  user.name = req.body.name;

  await user.save();

  res.json(user);
});
module.exports = router;
