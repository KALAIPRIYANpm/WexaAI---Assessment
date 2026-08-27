const graphService = require("../Services/graphService");


// GET /api/skills
async function getAllSkills(req, res) {

    try {

        const skills = await graphService.getAllSkills();

        res.json({
            success: true,
            count: skills.length,
            skills: skills
        });

    } catch (error) {

        console.error("Error fetching skills:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch skills"
        });
    }
}


module.exports = {
    getAllSkills
}; 