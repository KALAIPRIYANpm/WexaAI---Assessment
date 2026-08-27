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


// POST /api/developers
async function createDeveloper(req, res) {

    try {

        const { name, email, experience, skills } = req.body;

        if (!name || !email || experience === undefined || experience === "") {

            return res.status(400).json({
                success: false,
                message: "name, email and experience are required"
            });
        }

        const developer = await graphService.createDeveloper({
            name: name,
            email: email,
            experience: Number(experience),
            skills: Array.isArray(skills) ? skills : []
        });

        res.status(201).json({
            success: true,
            developer: developer
        });

    } catch (error) {

        console.error("Error creating developer:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create developer"
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
    createDeveloper,
    getDeveloperSkills
}; //developercontroller