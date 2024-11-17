const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/create", userController.createUser);
router.get("/all", userController.getAllUsers);
router.get("/read", userController.getUserByEmail);
router.get("/update", userController.updateUserByEmail);
router.get("/delete", userController.deleteUserByEmail);

module.exports = router;
