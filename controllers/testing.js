const router = require("express").Router();
const { User, Blog, ReadingList, Session } = require("../models");

router.post("/reset", async (req, res) => {
  await Session.destroy({ where: {} });
  await ReadingList.destroy({ where: {} });
  await Blog.destroy({ where: {} });
  await User.destroy({ where: {} });

  res.status(204).end();
});

module.exports = router;
