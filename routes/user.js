const router = require("express").Router();
const UserController = require("../controllers/UserController")
const isAdmin = require("../middlewares/authorization")
const isUser = require("../middlewares/auth")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', isUser, isAdmin, UserController.getUser)
router.delete('/user/:id', isUser, isAdmin, UserController.deleteUser)

module.exports = router;