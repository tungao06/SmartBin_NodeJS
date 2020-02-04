const express = require("express");
const router = express.Router();
const BinController = require("../controllers/BinController");

router.get('/', BinController.Bin_get_all);

router.get('/:Ids', BinController.Bin_get_Bin);

router.post('/', BinController.Bin_create_Bin);

router.put('/:Ids', BinController.Bin_edit_Bin);

router.delete('/:Ids', BinController.Bin_delete_Bin);


module.exports = router;