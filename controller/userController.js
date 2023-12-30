const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createAccessToken = require('../utils/createAccessToken')
const validEmail = require('../validation/validEmail')
const createRefreshToken = require('../utils/createRefreshToken')
const mongoose = require('mongoose')
const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        name,
        email,
        password
      } = req.body;
      if(!validEmail(email)){
        return res.status(400).json({
          code: 400,
          success: false,
          message: "invalid Email !"
        });
      }
      const user = await Users.findOne({
        email
      });
      if (user)
        return res.status(400).json({
          code: 400,
          success: false,
          message: "The email already exists."
        });

      if (password.length < 6)
        return res
          .status(400)
          .json({
            code: 400,
            success: false,
            message: "Password is at least 6 characters long."
          });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({
        id: newUser._id
      });
      const refreshtoken = createRefreshToken({
        id: newUser._id
      });
      res.json({
        code: 200,
        success: true,
        accessToken: accesstoken,
        refreshToken:refreshtoken
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  login: async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      if(!validEmail(email)){
        return res.status(400).json({
          code: 400,
          success: false,
          message: "invalid Email !"
        });
      }
      const user = await Users.findOne({
        email
      });
      if (!user) return res.status(400).json({
        code: 400,
        success: false,
        message: "invalid credentials !"
      });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({
        code: 400,
        success: false,
        message: "invalid credentials !"
      });

      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({
        id: user._id
      });
      const refreshtoken = createRefreshToken({
        id: user._id
      });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({
        code: 200,
        success: true,
        accessToken: accesstoken,
        refreshToken:refreshtoken
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  refreshToken: (req, res) => {
    try {

      const rf_token = req.header("RefreshToken")
      if (!rf_token)
        return res.status(400).json({
          code:400,
          success:false,
          message: "Please Login or Register"
        });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({
        code:400,
        success:false,
            message: "Please Login or Register"
          });

        const accesstoken = createAccessToken({
          id: user.id
        });

        res.json({
          code:200,
          success:true,
         token: accesstoken
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  getUser: async (req, res) => {
    try {

      Users.aggregate(
        [{
            $match: {
              _id: mongoose.Types.ObjectId(`${req.user.id}`),
            },
          },
          {
            $lookup: {
              from: "blogs",
              localField: "_id",
              foreignField: "user_id",
              as: "blogs",
            },
          },
        ],
        function (err, user) {
          if (err) {
            console.error(err);
            return;
          }
          delete user[0].password
          return res.status(200).json({
            code :200,
            success:true,
            data:user[0]
          });
        }
      );
     
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
};


module.exports = userCtrl;