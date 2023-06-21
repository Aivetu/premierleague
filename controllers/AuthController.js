const user = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HandleLogin = async(req,res) =>{

    const{username,password} = req.body;

    if(!username||!password) return res.status(400).json({"message":"Username and Password Required"});

    const foundUser = await user.findOne({username}).exec();

    if(!foundUser) return res.status(400).json({"message":"Username does not exist"});

    const matchPwd = bcrypt.compare(password,foundUser.password);
    if(matchPwd){
        const roles= Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo":
                {
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'10m'}
        );
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'3h'}
        );
        foundUser.refreshToken = refreshToken ;

        const result = await foundUser.save();
        console.log(result);
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None', maxAge:3 * 60 * 60 * 1000});
        res.json({accessToken});
    }else{
        res.sendStatus(401);
    }


}

module.exports= {HandleLogin};
