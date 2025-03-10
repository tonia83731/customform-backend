const Auth = require("../models/auth-models");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const authControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({
          success: false,
          message: "Name, email, password is required",
        });

      if (name.length < 4 || name.length > 20)
        return res.status(400).json({
          success: false,
          message: "Name should between 4-20 letters",
        });

      if (!validator.isEmail(email))
        return res.status(400).json({
          success: false,
          message: "Invalid email",
        });

      if (password.length < 4)
        return res.status(400).json({
          success: false,
          message: "Password length should over 4 letters",
        });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await Auth.create({
        name,
        email,
        password: hash,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await Auth.findOne({ email });

      if (!data)
        return res.status(400).json({
          success: false,
          messsage: "Email or password incorrect",
        });

      const isValid = await bcrypt.compare(password, data.password);
      if (!isValid)
        return res.status(400).json({
          success: false,
          messsage: "Email or password incorrect",
        });

      const user = data.toJSON();
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        data: {
          user: payload,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  checkedAuthentication: async (req, res) => {
    try {
      const { _id } = req.user;

      const user = await Auth.findOne(_id);

      if (!user)
        return res.status(200).json({
          success: true,
          data: {
            is_auth: false,
          },
        });

      return res.status(200).json({
        success: true,
        data: {
          is_auth: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authControllers;
