const express = require("express");
const cors = require("cors");
require("dotenv").config();

const driver = require("./db/neo4j");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SkillGraph API is running"
    });
});


// Test CognoDB connection
app.get("/api/test-db", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(
            "RETURN 'CognoDB connection successful' AS message"
        );

        res.json({
            success: true,
            message: result.records[0].get("message")
        });

    } catch (error) {

        console.error("CognoDB Error:", error);

        res.status(500).json({
            success: false,
            message: "Could not connect to CognoDB",
            error: error.message
        });

    } finally {

        await session.close();

    }
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SkillGraph server running on port ${PORT}`);
});

// Get all developers
app.get("/api/developers", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (d:Developer)
            RETURN d
            ORDER BY d.name
        `);

        const developers = result.records.map(record => {
            const developer = record.get("d").properties;

            return developer;
        });

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

    } finally {

        await session.close();

    }
});

// Get a developer by ID
app.get("/api/developers/:id", async (req, res) => {

    const session = driver.session();

    try {

        const developerId = req.params.id;

        const result = await session.run(
            `
            MATCH (d:Developer {id: $developerId})
            RETURN d
            `,
            {
                developerId: developerId
            }
        );

        if (result.records.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Developer not found"
            });

        }

        const developer = result.records[0].get("d").properties;

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

    } finally {

        await session.close();

    }
});

// Get developer skills
app.get("/api/developers/:id/skills", async (req, res) => {

    const session = driver.session();

    try {

        const developerId = req.params.id;

        const result = await session.run(
            `
            MATCH (d:Developer {id: $developerId})
                  -[:HAS_SKILL]->
                  (s:Skill)

            RETURN
                d.name AS developer,
                collect(s) AS skills
            `,
            {
                developerId: developerId
            }
        );

        if (result.records.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Developer not found"
            });

        }

        const record = result.records[0];

        const developer = record.get("developer");

        const skills = record.get("skills").map(skill => {
            return skill.properties;
        });

        res.json({
            success: true,
            developer: developer,
            skills: skills
        });

    } catch (error) {

        console.error("Error fetching skills:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch developer skills"
        });

    } finally {

        await session.close();

    }
});

// Get recommended jobs for a developer
app.get("/api/jobs/recommendations/:developerId", async (req, res) => {

    const session = driver.session();

    try {

        const developerId = req.params.developerId;

        const result = await session.run(
            `
            MATCH (d:Developer {id: $developerId})
                  -[:HAS_SKILL]->
                  (skill:Skill)
                  <-[:REQUIRES]-
                  (job:Job)
                  <-[:POSTED]-
                  (company:Company)

            WITH
                d,
                job,
                company,
                collect(DISTINCT skill.name) AS matchingSkills

            MATCH (job)-[:REQUIRES]->(requiredSkill:Skill)

            WITH
                d,
                job,
                company,
                matchingSkills,
                collect(DISTINCT requiredSkill.name) AS requiredSkills

            RETURN
    job.id AS jobId,
    job.title AS title,
    job.location AS location,
    job.experience AS experience,
    company.name AS company,
    matchingSkills,
    requiredSkills,
    [skill IN requiredSkills WHERE NOT skill IN matchingSkills] AS missingSkills,
    round(
        100.0 * size(matchingSkills) / size(requiredSkills)
    ) AS matchPercentage
ORDER BY matchPercentage DESC
            `,
            {
                developerId: developerId
            }
        );

        const recommendations = result.records.map(record => {

            return {
                jobId: record.get("jobId"),
                title: record.get("title"),
                location: record.get("location"),
                experience: record.get("experience"),
                company: record.get("company"),
                matchingSkills: record.get("matchingSkills"),
                requiredSkills: record.get("requiredSkills"),
                missingSkills: record.get("missingSkills"),
                matchPercentage: record.get("matchPercentage")
            };

        });

        res.json({
            success: true,
            developerId: developerId,
            count: recommendations.length,
            recommendations: recommendations
        });

    } catch (error) {

        console.error("Recommendation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate job recommendations",
            error: error.message
        });

    } finally {

        await session.close();

    }
});