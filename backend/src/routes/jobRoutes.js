const express = require("express");

const {
    getAllJobs,
    getJobById,
    getJobRecommendations
} = require("../controllers/jobController");

const router = express.Router();



router.get(
    "/recommendations/:developerId",
    getJobRecommendations
);


router.get("/", getAllJobs);


router.get("/:id", getJobById);


module.exports = router;