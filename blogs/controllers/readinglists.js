const router = require("express").Router();
const sessionValidator = require("../middleware/sessionValidator");
const { ReadingList, User, Blog } = require("../models");
router.post("/", async (req, res) => {
  const { userId, blogId } = req.body;

  try {
    if (!userId || !blogId) {
      return res.status(400).json({ error: "missing userId or blogId" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ error: "blog not found" });

    const existing = await ReadingList.findOne({
      where: { userId, blogId },
    });

    if (existing) {
      return res.status(400).json({ error: "already in reading list" });
    }

    const readingListEntry = await ReadingList.create({
      userId,
      blogId,
      read: false,
    });
    console.log(readingListEntry.toJSON());

    res.status(201).json({
      id: readingListEntry.id,
      user_id: readingListEntry.userId,
      blog_id: readingListEntry.blogId,
      read: readingListEntry.read,
    });
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
    return res.status(401).json({ error: "forbidden" }); // ✅ FIX
  }

  if (req.body.read === undefined) {
    return res.status(400).json({ error: "missing read field" });
  }

  readingList.read = req.body.read;
  await readingList.save();

  res.json(readingList);
});
router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read !== undefined) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "name", "username"],
    include: {
      model: Blog,
      as: "readings",
      attributes: ["id", "title", "author", "url"],
      through: {
        attributes: ["id", "read"],
        where,
      },
    },
  });

  if (!user) return res.status(404).end();

  res.json(user);
});
module.exports = router;
