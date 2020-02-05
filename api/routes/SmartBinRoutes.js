const express = require("express");
const router = express.Router();
const SmartBinController = require("../controllers/SmartBinController");

router.get('/', SmartBinController.SmartBin_get_all);

router.get('/:Ids', SmartBinController.SmartBin_get_SmartBin);

router.post('/', SmartBinController.SmartBin_create_SmartBin);

router.put('/:Ids', SmartBinController.SmartBin_edit_SmartBin);

router.delete("/:Ids", SmartBinController.SmartBin_delete_SmartBin);

//Complex API

router.put('/:Ids/:State', SmartBinController.SmartBin_put_SmartBin_ChangeState);
router.put('/:Ids/:UserUid/:State', SmartBinController.SmartBin_put_SmartBin_ChangeState_Uid);


module.exports = router;