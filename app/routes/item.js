const router = require("express").Router();
const ItemController = require("../controllers/ItemController");

router.get("/", ItemController.getItem);
router.delete("/", ItemController.deleteItem);
router.post("/", ItemController.addItem);
router.put("/:id", ItemController.editItem);
router.delete("/:id",ItemController.deleteItem);

module.exports = router;
