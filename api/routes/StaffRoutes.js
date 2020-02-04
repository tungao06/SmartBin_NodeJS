const express = require("express");
const router = express.Router();
const staffController = require("../controllers/StaffController");

router.get('/', staffController.Staff_get_all);

router.get('/:Uid', staffController.Staff_get_Staff);

router.post('/', staffController.Staff_create_Staff);

router.put('/:Ids', staffController.Staff_edit_Staff);

router.delete('/:Ids', staffController.Staff_delete_Staff);


module.exports = router;