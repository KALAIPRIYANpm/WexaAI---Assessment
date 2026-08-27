const express = require("express");

const {
    getDeveloperGraph
} = require("../controllers/graphController");

const router = express.Router();


// GET /api/graph/:developerId
router.get("/:developerId", getDeveloperGraph);


module.exports = router;