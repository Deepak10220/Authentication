const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "please Provide All Field",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(404).json({
        success: false,
        message: "User Already Exist",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashpassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "please Provide All Field",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email And Password",
      });
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      success: true,
      message: "User Login",
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  Signup,
  Login,
};
