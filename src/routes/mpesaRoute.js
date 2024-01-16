const express = require("express");
const { callBack } = require("../controllers/mpesaController");

const router = express.Router();
router.post("/callback", callBack);
module.exports = router;