const router = require("express").Router();
const ReminderController = require("../controllers/ReminderController");

router.post("/", ReminderController.addReminder);
router.get("/", ReminderController.getReminder);
router.put("/:id", ReminderController.editReminder);
router.delete("/:id", ReminderController.deleteReminder);

module.exports = router;