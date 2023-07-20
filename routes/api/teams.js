const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/teamControllers');
const verifyRole = require('../../middleware/VerifyRoles');
const roles = require ('../../config/roles_list');

router.route('/')
.get(teamController.getTeams)
.post(verifyRole(roles.Admin),teamController.createTeams)
.put(verifyRole(roles.Admin),teamController.editTeams)
.delete(verifyRole(roles.Admin),teamController.deleteTeams)


router.route('/:id')
.get(teamController.getOneTeam)

module.exports = router;
