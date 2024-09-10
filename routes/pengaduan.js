const router = require("express").Router();
const { PengaduanController, upload } = require("../controllers/PengaduanController");

router.post("/", upload.single("file"), PengaduanController.addPengaduan);

module.exports = router;