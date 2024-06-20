const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {

    try {

        // const authHeader = req.headers["authorization"];

        // const token = authHeader && authHeader.split(" ")[1];

        const {token} = req.cookies;

            if(!token) {
                return res.json({
                    success:false,
                    message:'Token is missing',
                });
            }


            try{
                const decode =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                // console.log("decode= ",decode);
                req.user = decode;
                next();      
            }
            catch(err) {
                //verification - issue
                return res.status(401).json({
                    success:false,
                    message:'token is invalid',
                });
            }
             

        
    } catch (error) {
        res.status(401).json({
            success: false,
            message:" Something went wrong while validating the token ",
            error:error
        });
        
    }

};
