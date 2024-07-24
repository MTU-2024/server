const router = require("express").Router();
const ProjectController = require("../controllers/ProjectController");
const isAdmin = require("../middlewares/authorization")
const isUser = require("../middlewares/auth")

router.get("/", ProjectController.getProject);
router.post("/", isUser, isAdmin, ProjectController.addProject);
router.put("/:id", isUser, isAdmin, ProjectController.editProject);
router.delete("/:id", isUser, ProjectController.deleteProject);

module.exports = router;