const express = require("express");

const {
    getAllSkills
} = require("../controllers/skillController");

const router = express.Router();



router.get("/", getAllSkills);


module.exports = router;