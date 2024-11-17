const User = require("../models/userModel");
const TeachersModel = require("../models/Teacher");
const StudentsModel = require("../models/Students");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllTeachers = async (req, res, next) => {
  try {
    const users = await TeachersModel.find({
      _id: { $ne: req.params.id },
    }).select(["Email", "Name", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllStudents = async (req, res, next) => {
  try {
    const users = await StudentsModel.find({
      _id: { $ne: req.params.id },
    }).select(["Email", "Name", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required" });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

// Create a new user
// In user-crud.js controller
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.query; // Use req.query instead of req.body

    // Validation check to ensure all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by email
exports.updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const { username, password } = req.query;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username, password },
      { new: true }
    );
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by email
exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const deletedUser = await User.findOneAndDelete({ email });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
