const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const url = require("url");
const dontenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const handlebars = require("handlebars");
const path = require("path");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const VerToken = require("../models/VerTokenSchema");
const TempUser = require("../models/TempUserSchema");

// @route   POST api/users
//@ desc    Send verification email
//@access   Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("name", "Name is Required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
      //Check if User already exist

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        userTemp = new TempUser({
          email,
          name,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        userTemp.password = await bcrypt.hash(password, salt);

        await userTemp.save();
        verToken = new VerToken({
          _userId: userTemp._id,
          token: randomstring.generate(),
        });

        await verToken.save();

        //Send email with vertification link

        let readHTMLFile = function (path, callback) {
          fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
            if (err) {
              throw err;
              callback(err);
            } else {
              callback(null, html);
            }
          });
        };

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const dirPath = path.join("htmlTemplates/verification.html");

        readHTMLFile(dirPath, function (err, html) {
          let template = handlebars.compile(html);
          let replacements = {
            name: name,
            link: `http://${req.headers.host}/users/${verToken.token}`,
            url: `http://${req.headers.host}.com`,
          };

          let htmlToSend = template(replacements);
          let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `Contact name: ${name}`,
            html: htmlToSend,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.send("error");
            } else {
              res.status(200).json({
                msg: `A verification link has been send yo your email account ${email}`,
              });
            }
          });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/users/:token
//@ desc   Verify email address
//@access   Public

router.get("/:token", async (req, res) => {
  let token = req.params;

  try {
    //Check if token exist

    let verificationToken = await VerToken.findOne(token);

    if (!verificationToken) {
      return res
        .status(400)
        .json({ error: "Email address confirmation link is invalid" });
    }
    let user = await TempUser.findOne(verificationToken._userId);
    if (!user) {
      return res.status(500).send("Server Error");
    }

    newUser = new User({
      email: user.email,
      name: user.name,
      password: user.password,
    });
    await user.remove();
    await verificationToken.remove();
    await newUser.save();

    res.status(200).json({ msg: "Your email was successfully verified" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
