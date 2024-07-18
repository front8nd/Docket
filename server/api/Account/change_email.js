const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/users");
const authMiddleware = require("../../middleware/auth");
const bcrypt = require("bcryptjs");

// Route to update user email
router.post("/api/acc_email", authMiddleware, async (req, res) => {
  const { oldEmail, email, password } = req.body; // Make sure to include password in the request body
  console.log(req.body);
  try {
    // Find user by email
    const user = await UsersModel.findOne({ email: oldEmail });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update user email
    user.email = email;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email changed successfully",
      data: email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
