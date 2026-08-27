const express = require("express");

const {
    getDeveloperGraph
} = require("../controllers/graphController");

const router = express.Router();


router.get("/:developerId", getDeveloperGraph);


module.exports = router;