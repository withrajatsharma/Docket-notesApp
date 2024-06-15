const jwt = require("jsonwebtoken");

function  authenticateToken(req, res, next) {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  // const {token} = req.cookies;

  if (!token) return res.sendStatus(401);


  try {

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:" error while authorizing token",
      error:error.message
    });
    
  }


}


module.exports = {
  authenticateToken,
};
