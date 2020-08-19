const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dontenv = require("dotenv").config();
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route   GET api/auth
//@ desc    Get logged in user
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

// @route   POST api/auth
//@ desc    Auth user & get token
//@access   Private
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      let user = await User.findOne({ name });

      if (!user) {
        res.status(400).json({ error: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user._id,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,

        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ msg: `${user.name} Welcome Back!`, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: "Server Error" });
    }
  }
);

module.exports = router;
