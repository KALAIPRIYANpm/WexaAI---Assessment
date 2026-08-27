const express = require("express");

const {
    getAllJobs,
    getJobById,
    getJobRecommendations
} = require("../controllers/jobController");

const router = express.Router();


// IMPORTANT:
// Put recommendations before /:id
router.get(
    "/recommendations/:developerId",
    getJobRecommendations
);


// GET /api/jobs
router.get("/", getAllJobs);


// GET /api/jobs/:id
router.get("/:id", getJobById);


module.exports = router;