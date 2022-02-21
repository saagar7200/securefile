const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("../db/connection");
const User = require("../db/models/userSchema");
//middleware

const middleware = (req, res, next) => {
  console.log("from middleware of about");
  next();
};

router.get("/", (req, res) => {
  res.send("hello from server fromm express router");
});

router.get("/home", (req, res) => {
  res.send("hello from home ");
});

router.get("/contact", (req, res) => {
  res.send("hello from contact");
});

router.get("/about", middleware, (req, res) => {
  res.send("hello from aboutMe");
});

// router.post("/signin", (req, res) => {
//   res.send("hello from Sign In plz log in");
//   const { email, password } = req.body;
//   console.log(req.body);
// });

router.post("/register", async (req, res) => {
  const { fName, lName, uName, email, password, cpassword, ph_no, keyword } =
    req.body;
  console.log(email, password);

  if (!fName || !lName || !uName || !email || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the from properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "user with is email  alreay exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const user = new User({
        fName,
        lName,
        uName,
        email,
        password,
        cpassword,
        ph_no,
        keyword,
      });

      //hashing is applied here -->pre-save

      const userRegistered = await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(email, password);
    if (!email || !password) {
      return res.json({ message: "email and password both are required" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.json({ message: "invalid credinentials" });
      } else {
        return res.json({ message: "Login Successfull" });
      }
    } else {
      res.status(400).json({ error: "invalid credinentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: "failed to register!! try again" });
  }
});

module.exports = router;
