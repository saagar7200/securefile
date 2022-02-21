const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("../connection");

//user schema

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  uName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  ph_no: {
    type: Number,
    required: true,
  },
  keyword: {
    //like security qns
    type: String,
    required: true,
  },
});

//hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log("hi from hashing");
    // console.log(this.password);
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//creating model (schema)

const user = new mongoose.model("USER", userSchema);

module.exports = user;
