const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      date: new Date(),
    });

    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// DELETE blog
blogsRouter.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = blogsRouter;
