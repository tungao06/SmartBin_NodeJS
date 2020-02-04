const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/LocationController");

router.get('/', LocationController.Location_get_all);

router.get('/:Ids', LocationController.Location_get_Location);

router.post('/', LocationController.Location_create_Location);

router.put('/:Ids', LocationController.Location_edit_Location);

router.delete('/:Ids', LocationController.Location_delete_Location);


module.exports = router;