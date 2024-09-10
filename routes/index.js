const router = require("express").Router();
const item = require("./item");
const user = require("./user");
const project = require("./project");
const pengaduan = require("./pengaduan");
const reminder = require("./reminder");

router.use("/inventory", item);
router.use("/", user);
router.use("/project", project);
router.use("/pengaduan", pengaduan);
router.use("/reminder", reminder);

module.exports = router;
