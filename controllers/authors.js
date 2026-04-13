const router = require("express").Router();
const { fn, col } = require("sequelize");
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("id")), "blogs"],
      [fn("SUM", col("likes")), "likes"],
    ],
    group: ["author"],
    order: [[fn("SUM", col("likes")), "DESC"]],
    raw: true,
  });

  res.json(authors);
});

module.exports = router;
