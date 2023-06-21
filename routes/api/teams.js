const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/teamControllers');

router.route('/')
.get(teamController.getTeams)
.post(teamController.createTeams)
.put(teamController.editTeams)
.delete(teamController.deleteTeams)


router.route('/:id')
.get(teamController.getOneTeam)

module.exports = router;
