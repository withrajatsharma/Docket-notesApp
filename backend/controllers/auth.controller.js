const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "one of the mandotary field is empty",
      });
    }

    if (await userModel.findOne({ email })) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    let securedPassword;

    try {
      securedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.json({
        success: false,
        message: "hasing was unsuccesfull",
      });
    }

    const user = await userModel.create({
      fullName,
      email,
      password: securedPassword,
    });

    user.password = undefined;

    const accessToken = jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "36000m",
      }
    );

    res.status(200).json({
      success: true,
      user: user,
      token: accessToken,
      message: "user created successfully",
    });
  } catch (error) {
    res.json({
      message: "error occured",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "enter email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(200).json({
        success: false,
        message: "user does not exist",
      });
    }

    
    if ( await bcrypt.compare(password, user.password)) {
      user.password = undefined;
      const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "36000m",
        }
      );


      res.json({
        success: true,
        user: user,
        token: accessToken,
        message: "user logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "password incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " error occured while logging in the user ",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
      try {

        const userId = req.user.user._id;

        const user = await userModel.findOne({_id:userId});

        if(!user){
         return res.status(500).json({
            success: false,
            message:" no such user found",
            // error:error.message
          });
        }

        user.password = undefined;

       

     return res.status(200).json({
        success: true,
        user,
        message:" user found successfully"
      });



        
      } catch (error) {
       return res.status(500).json({
          success: false,
          message:" error occured while getting user",
          error:error.message
        });
        
      }
};

module.exports = {
  signUp,
  login,
  getUser,
};
