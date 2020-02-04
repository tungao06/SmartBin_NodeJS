const express = require("express");
const router = express.Router();
const SmartBinController = require("../controllers/SmartBinController");

router.get('/', SmartBinController.SmartBin_get_all);

router.get('/:Ids', SmartBinController.SmartBin_get_SmartBin);

router.post('/', SmartBinController.SmartBin_create_SmartBin);

router.put('/:Ids', SmartBinController.SmartBin_edit_SmartBin);

router.delete("/:Ids", SmartBinController.SmartBin_delete_SmartBin);


module.exports = router;