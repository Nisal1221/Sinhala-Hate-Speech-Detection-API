
const express = require("express");
const router = express.Router();
const User = require("../models/User"); 


// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const ADMIN_EMAIL = "admin@hariwachana.lk";
    let actualRole = role;

    if (role === "Admin" && email !== ADMIN_EMAIL) {
      actualRole = "User"; // Force user role if not using the approved admin email
    }

    const newUser = new User({
      username,
      email,
      password,
      role: actualRole
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


  

// Login (basic, no hashing for now)
// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Compare passwords (for now, plaintext match – bcrypt can be added later)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Return success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
