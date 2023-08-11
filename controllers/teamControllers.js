const teams = require('../model/Team');

const createTeams = async (req,res) =>{
    const {team,abb} = req.body;
    if(!req?.body?.team || !req?.body?.team ){
        return res.status(400).json({"message":"Team name is required"});
    }
    const findTeam = await teams.findOne({team}).exec();
    if(findTeam){ 
        return res.status(400).json({"message":"This team has already been created"});
    }
    try {
        const result = await teams.create({
            "team":team,
            "abb":abb
        });
        res.status(200).json({"message":"New team created successfully"});
        
    } catch (error) {
        console.error(error);
    }
}

const getTeams= async (req,res) =>{
    const team =await teams.find();
    if(!teams)res.status(200).json({'message':"No teams found"});

    res.json(team);
}

const editTeams = async (req,res)=>{
    if(!req?.body.id) {
        return res.status(400).json({'message':" ID Parameter is Required"});
    }
    const findTeam = await teams.findOne({_id:req.body.id}).exec();
    if(!findTeam) {
        return res.status(400).json({"message":"Team does not exist"});
    }
    if(req.body?.team) findTeam.team = req.body.team;
    if(req.body?.abb) findTeam.abb = req.body.abb;

    const response = await findTeam.save();
    res.json(response);

}
const deleteTeams = async(req,res)=>{
    if(!req?.body.id) {
        return res.status(400).json({'message':" ID Parameter is Required"});
    }
    const findTeam = await teams.findOne({_id:req.body.id}).exec();
    if(!findTeam) {
        return res.status(400).json({"message":"Team does not exist"});
    }

    const response = await findTeam.deleteOne({_id:req.body.id});
    res.json({"message":`Team with ID ${findTeam.id} has been deleted`});

}

const getOneTeam = async(req,res) =>{
    if(!req?.params?.id) return res.status(400).json({"message":"ID Parameter is Required"});

    const findTeam = await teams.findOne({_id:req.params.id}).exec();
    if(!findTeam) {
        return res.status(400).json({"message":"Team does not exist"});
    }
    res.json(findTeam);
}

module.exports = {
    createTeams,
    getTeams,
    editTeams,
    deleteTeams,
    getOneTeam
};