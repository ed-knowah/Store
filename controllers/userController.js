const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("../models/validator");

module.exports = {
  getAllUsers: async (req, res) => {
    user.userModel.find({}, (err, foundData) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(foundData);
      }
    });
  },

  createUser: async (req, res) => {
    const { error } = validator.validateUser.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const person = new user.userModel();
    const { name, email, number, address, gender, password } = req.body;

    person.name = name;
    person.email = email;
    person.number = number;
    person.address = address;
    person.gender = gender;
    const suppliedPassword = password;

    try {
      person.password = await bcrypt.hash(suppliedPassword, 10);
    } catch (error) {
      console.log("error", error);
    }

    person.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(savedObject);
      }
    });
  },

  loginUser: async (req, res) => {
    const { password, email } = req.body;

    try {
      const findUser = await user.userModel.findOne({ email });
      const isMatch = await bcrypt.compare(password, findUser.password);
      //console.log(isMatch);
      //console.log(findUser);
      if (!findUser || !isMatch) {
        // if any of the two is not correct
        return res.json({
          msg: "email or password is invalid",
          error: true,
        });
      }
      // create and assign a token
      const token = jwt.sign(
        { _id: user.userModel._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.header("auth-token", token).json({ token: token, user: findUser });
    } catch (error) {
      res.json({
        msg: "email or password is invalid",
        error: true,
      });
      console.log("error", error);
    }
  },
};
