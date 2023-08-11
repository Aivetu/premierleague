const user = require('../model/User');
const jwt = require('jsonwebtoken');

const HandleRefreshToken = async(req,res)=>{
   const cookie  = req.cookies;
    if(!cookie?.jwt) return res.sendStatus(401);
    const refreshToken= cookie.jwt;
    console.log(refreshToken);
    const result = await user.findOne({refreshToken}).exec();
    if(!result) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || result.username!== decoded.username) return res.sendStatus(403);
            const roles= Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo":
                    {
                        "username":decoded.username,
                        "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"10m"}

            );
            res.json({accessToken});
        }
    );

}
module.exports = {HandleRefreshToken};