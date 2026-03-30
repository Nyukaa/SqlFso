const router = require("express").Router();

const { ReadingList, User, Blog } = require("../models");

router.post("/", async (req, res) => {
  const { userId, blogId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user) {
      return res.status(400).json({ error: "invalid userId" });
    }

    if (!blog) {
      return res.status(400).json({ error: "invalid blogId" });
    }

    const readingListEntry = await ReadingList.create({
      userId,
      blogId,
    });

    res.status(201).json(readingListEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
