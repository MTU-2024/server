const router = require("express").Router();
const item = require("./item");
const user = require("./user");
const project = require("./project");

router.use("/inventory", item)
router.use("/", user)
router.use("/project", project)

module.exports = router;