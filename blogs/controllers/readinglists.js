const router = require("express").Router();
const sessionValidator = require("../middleware/sessionValidator");
const { ReadingList, User, Blog } = require("../models");

router.post("/", sessionValidator, async (req, res) => {
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
router.put("/:id", sessionValidator, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);

  if (!readingList) {
    return res.status(404).json({ error: "reading list entry not found" });
  }

  if (readingList.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  readingList.read = req.body.read;

  await readingList.save();

  res.json(readingList);
});
module.exports = router;
