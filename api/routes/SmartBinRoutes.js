const express = require("express");
const router = express.Router();
const SmartBinController = require("../controllers/SmartBinController");

router.get('/', SmartBinController.smartbin_get_all);

router.get('/:Ids', SmartBinController.smartbin_get_smartbin);

router.post('/', SmartBinController.smartbin_create_smartbin);

router.put('/:Ids', SmartBinController.smartbin_edit_smartbin);

router.delete("/:Ids", SmartBinController.smartbin_delete_smartbin);


module.exports = router;