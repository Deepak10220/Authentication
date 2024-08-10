const express = require("express");
const {
  SignupValidation,
  LoginValidation,
} = require("../middleware/AuthValidation");
const { Signup, Login } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", SignupValidation, Signup);
router.post("/login", LoginValidation, Login);
module.exports = router;
