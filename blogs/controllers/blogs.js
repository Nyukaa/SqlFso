const blogsRouter = require("express").Router();
const sessionValidator = require("../middleware/sessionValidator");
const Blog = require("../models/blog");
const { User } = require("../models");
const { Op } = require("sequelize");
// Middleware to find a blog by ID and attach it to the request object
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};
blogsRouter.get("/", async (req, res) => {
  const where = {};
  //13.13
  // if (req.query.search) {
  //   where.title = {
  //     [Op.iLike]: `%${req.query.search}%`,
  //   };
  // }
  //13.14 for searching in both title or author
  if (req.query.search) {
    const keyword = `%${req.query.search}%`;
    where[Op.or] = [
      { title: { [Op.iLike]: keyword } },
      { author: { [Op.iLike]: keyword } },
    ];
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ["id", "username", "name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

blogsRouter.post("/", sessionValidator, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      date: new Date(),
      userId: user.id,
    });

    res.json(blog);
  } catch (error) {
    next(error);
  }
});
// DELETE blog, check if the user is the owner
blogsRouter.delete("/:id", sessionValidator, blogFinder, async (req, res) => {
  if (String(req.blog.userId) !== String(req.decodedToken.id)) {
    return res
      .status(403)
      .json({ error: "you are not allowed to delete this blog" });
  }

  await req.blog.destroy();

  res.status(204).end();
});

//PUT  like of a blog

blogsRouter.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (error) {
    next(error);
  }
});
module.exports = blogsRouter;
