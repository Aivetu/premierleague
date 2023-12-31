const DB = require('../model/User');
const bcrypt = require('bcrypt');
const {format} = require('date-fns');

const createNewUser = async(req,res) =>{

    const{username,roles,password} = req.body;

    if(!username||!password) return res.status(400).json({"message":"Username and Password Required"});

    const duplicateUser = await DB.findOne({username}).exec();

    if(duplicateUser) return res.status(400).json({"message":"Username already exist"});

    try {
        hashedPassword = await bcrypt.hash(password,10);

        const result = await DB.create({
            "username":username,
            "password":hashedPassword,
            "roles": roles,
            "dateCreated":format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
        });
        console.log(result);
        res.status(200).json({"message":"new user successfully created"})
    } catch (error) {
        console.error(error);
    }

}
module.exports = {createNewUser};