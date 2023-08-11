const express = require('express');
const router = express.Router();
const fixtureController = require('../../controllers/fixturesController');
const verifyRole = require('../../middleware/VerifyRoles');
const roles = require ('../../config/roles_list');


router.route('/')
.post(verifyRole(roles.Admin), fixtureController.createFixture)
.get(fixtureController.getAllFixtures)
.put(verifyRole(roles.Admin),fixtureController.editFixture)
.delete(verifyRole(roles.Admin),fixtureController.deleteFixture);

router.route('/pending')
.get(fixtureController.getPendingFixtures);

router.route('/completed')
.get(fixtureController.getCompletedFixtures);

module.exports = router;