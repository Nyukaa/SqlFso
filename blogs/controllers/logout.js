const router = require("express").Router();
const { Session } = require("../models");
const sessionValidator = require("../middleware/sessionValidator");

router.delete("/", sessionValidator, async (req, res) => {
  const token = req.get("authorization").substring(7);

  await Session.destroy({
    where: { token },
  });

  res.status(204).end();
});

module.exports = router;
