const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
// Middleware to find a blog by ID and attach it to the request object
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};
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
    next(error);
  }
});
// DELETE blog
blogsRouter.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.json(req.blog);
});

//PUT  like of a blog

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (error) {
    next(error);
  }
});
module.exports = blogsRouter;
