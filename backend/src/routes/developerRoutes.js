const express = require("express");

const {
    getAllDevelopers,
    getDeveloperById,
    createDeveloper,
    getDeveloperSkills
} = require("../controllers/developerController");

const router = express.Router();



router.get("/", getAllDevelopers);



router.post("/", createDeveloper);



router.get("/:id/skills", getDeveloperSkills);


router.get("/:id", getDeveloperById);


module.exports = router;  