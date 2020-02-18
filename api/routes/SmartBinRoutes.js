const express = require("express");
const router = express.Router();
const SmartBinController = require("../controllers/SmartBinController");

router.get('/', SmartBinController.SmartBin_get_all);

router.get('/State/:Name', SmartBinController.SmartBin_get_State);

router.get('/:Name', SmartBinController.SmartBin_get_SmartBin);

router.post('/', SmartBinController.SmartBin_create_SmartBin);

router.put('/:Name', SmartBinController.SmartBin_edit_SmartBin);


router.delete("/:Name", SmartBinController.SmartBin_delete_SmartBin);

// ! Complex API

router.put('/:Name/:Type', SmartBinController.SmartBin_edit_SmartBin_Type);

router.put('/:Name/:Uid/:State', SmartBinController.SmartBin_put_SmartBin_ChangeState);

router.put('/:Name/:Uid/:State', SmartBinController.SmartBin_put_SmartBin_ChangeState_Uid);

module.exports = router;