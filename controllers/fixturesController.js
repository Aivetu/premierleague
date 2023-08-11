const fixture = require('../model/Fixture');
const teams = require('../model/Team');

const getAllFixtures = async(req,res)=>{
    const response = await fixture.find();
    if(!response) return res.status(200).json({"message":"No fixture found"});
    res.json(response);
    
}

const createFixture = async(req,res)=>{
    const {teamA,teamB,status} = req.body;
    if(!teamA || !teamB) return res.status(400).json({"message":"Please enter teams for fixtures"});
    if(teamA===teamB)return res.status(400).json({"message":"Choose different teams"});

    const duplicatefixtures = await fixture.findOne({teamA:teamA,teamB:teamB}).exec();
    console.log(duplicatefixtures);
    if(duplicatefixtures) return res.status(400).json({"message":"This fixture has already been created"});

    try {
        const response = await fixture.create({
            "teamA":teamA,
            "teamB":teamB,
            "status":status
        });
        res.status(200).json({"message":"New fixture created successfully", data: response});        
    } catch (error) {
        console.error(error);
        
    }

}
const editFixture = async(req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"message":"Id does not exist"});

    const findFixture = await fixture.findOne({_id:req.body.id}).exec();
    if(!findFixture) return res.status(400).json({"message":"Fixture does not exist"});
    if(req?.body?.status) findFixture.status = req.body.status;
    if(req?.body?.teamA) findFixture.teamA = req.body.teamA;
    if(req?.body?.teamB) findFixture.teamB = req.body.teamB;
    const response = await findFixture.save();
    res.json({"message":"Fixture edited successfully",response});

}
const deleteFixture = async(req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"message":"Id does not exist"});

    const findFixture = await fixture.findOne({_id:req.body.id}).exec();
    if(!findFixture) return res.status(400).json({"message":"Fixture does not exist"});
    const response = await findFixture.deleteOne({_id:req.body.id});
    res.json({"message":`Fixture with ID ${req.body.id} has been deleted`});
    
}
const getOneFixture = async(req,res)=>{
    
    
    
}
const getPendingFixtures= async(req,res)=>{
    const response = await fixture.find({"status":"pending"});
    if(!response) return res.status(200).json({"message":"No fixture found"});
    res.json(response);
}
const getCompletedFixtures= async(req,res)=>{
    const response = await fixture.find({"status":"completed"});
    if(!response) return res.status(200).json({"message":"No fixture found"});
    res.json(response);

}
module.exports= {
    createFixture,
    getAllFixtures,
    deleteFixture,
    editFixture,
    getPendingFixtures,
    getCompletedFixtures
}