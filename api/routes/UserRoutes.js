const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get('/', UserController.User_get_all);

router.get('/:Uid', UserController.User_get_User);

router.post('/', UserController.User_create_User);

router.put('/:Uid', UserController.User_edit_User);

router.delete('/:Uid', UserController.User_delete_User);

router.put('/:Uid/:GoodBin/:BadBin', UserController.User_edit_User_Bin);

router.put('/:Uid/:Point', UserController.User_edit_Point);

module.exports = router;