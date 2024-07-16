const express = require("express");
const router = express.Router();
const UsersModel = require("../models/users");
const authMiddleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.post("/api/acc_password", authMiddleware, async (req, res) => {
  const { userId, password, newPassword } = req.body;
  try {
    // Find user by Id
    const user = await UsersModel.findById(userId);

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

    // New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // We already have user object that we retrived from first line, we can update the data directly as well
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
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
