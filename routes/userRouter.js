const router = require("express").Router();
const userController = require("../controller/userController");
const auth = require("../middleware/authentication");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", auth,userController.getUser);
router.get("/getToken", userController.refreshToken);
module.exports = router; 