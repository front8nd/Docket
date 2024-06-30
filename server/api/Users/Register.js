const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");
const router = express.Router();
// Register
router.post("/api/Users/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("first");
  try {
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Users already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
