const graphService = require("../Services/graphService");


// GET /api/developers
async function getAllDevelopers(req, res) {

    try {

        const developers = await graphService.getAllDevelopers();

        res.json({
            success: true,
            count: developers.length,
            developers: developers
        });

    } catch (error) {

        console.error("Error fetching developers:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch developers"
        });
    }
}


// GET /api/developers/:id
async function getDeveloperById(req, res) {

    try {

        const developerId = req.params.id;

        const developer =
            await graphService.getDeveloperById(developerId);

        if (!developer) {

            return res.status(404).json({
                success: false,
                message: "Developer not found"
            });
        }

        res.json({
            success: true,
            developer: developer
        });

    } catch (error) {

        console.error("Error fetching developer:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer"
        });
    }
}


// GET /api/developers/:id/skills
async function getDeveloperSkills(req, res) {

    try {

        const developerId = req.params.id;

        const result =
            await graphService.getDeveloperSkills(developerId);

        if (!result) {

            return res.status(404).json({
                success: false,
                message: "Developer not found"
            });
        }

        res.json({
            success: true,
            developer: result.developer,
            skills: result.skills
        });

    } catch (error) {

        console.error("Error fetching skills:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer skills"
        });
    }
}


module.exports = {
    getAllDevelopers,
    getDeveloperById,
    getDeveloperSkills
};