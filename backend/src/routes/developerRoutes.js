const express = require("express");

const {
    getAllDevelopers,
    getDeveloperById,
    createDeveloper,
    getDeveloperSkills
} = require("../controllers/developerController");

const router = express.Router();


// GET /api/developers
router.get("/", getAllDevelopers);


// POST /api/developers
router.post("/", createDeveloper);


// GET /api/developers/:id/skills
router.get("/:id/skills", getDeveloperSkills);


// GET /api/developers/:id
router.get("/:id", getDeveloperById);


module.exports = router;  //developerRoutes