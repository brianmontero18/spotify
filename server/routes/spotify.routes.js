const express = require("express");
const router = express.Router();
const { checkAccessTokenExpiration } = require("../helpers/middlewares");

// Album
router.use("/album", checkAccessTokenExpiration, require("./api/album"));

// Artist
router.use("/artist", checkAccessTokenExpiration, require("./api/artist"));

module.exports = router;
