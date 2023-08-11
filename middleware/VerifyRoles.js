const verifyRole =(...allowedRoles)=>{
    return  (req,res,next)=>{
    
    if(!req?.roles) return res.sendStatus(401);
    const RolesArray =[...allowedRoles];
    const result = req.roles.map(role => RolesArray.includes(role)).find(val => val === true);
    if (!result) res.sendStatus(401);
    next();
}
}
module.exports = verifyRole;