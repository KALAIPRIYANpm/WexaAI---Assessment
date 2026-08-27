const neo4j = require("neo4j-driver");
const { randomUUID } = require("node:crypto");
const driver = require("../db/neo4j");


// ---------------------------------------
// Helper: convert Neo4j Integer objects
// ({low, high}) into plain JS numbers,
// recursively, anywhere in an object/array
// ---------------------------------------
function toNativeTypes(value) {

    if (neo4j.isInt(value)) {
        return value.toNumber();
    }

    if (Array.isArray(value)) {
        return value.map(toNativeTypes);
    }

    if (value !== null && typeof value === "object") {

        const result = {};

        for (const key in value) {
            result[key] = toNativeTypes(value[key]);
        }

        return result;
    }

    return value;
}


// Get all developers
async function getAllDevelopers() {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (d:Developer)
            RETURN d
            ORDER BY d.name
        `);

        return result.records.map(record => {
            return toNativeTypes(record.get("d").properties);
        });

    } finally {

        await session.close();

    }
}


// Get developer by ID
async function getDeveloperById(developerId) {

    const session = driver.session();

    try {

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
            return null;
        }

        return toNativeTypes(
            result.records[0].get("d").properties
        );

    } finally {

        await session.close();

    }
}


// ---------------------------------------
// Create a new developer, optionally
// attaching HAS_SKILL relationships to
// existing Skill nodes by name
// ---------------------------------------
async function createDeveloper({ name, email, experience, skills }) {

    const session = driver.session();

    try {

        const id = randomUUID();

        await session.run(
            `
            CREATE (d:Developer {
                id: $id,
                name: $name,
                email: $email,
                experience: $experience
            })
            `,
            {
                id: id,
                name: name,
                email: email,
                experience: neo4j.int(experience)
            }
        );

        if (skills && skills.length > 0) {

            await session.run(
                `
                MATCH (d:Developer {id: $id})
                UNWIND $skills AS skillName
                MATCH (s:Skill {name: skillName})
                MERGE (d)-[:HAS_SKILL]->(s)
                `,
                {
                    id: id,
                    skills: skills
                }
            );

        }

        const result = await session.run(
            `MATCH (d:Developer {id: $id}) RETURN d`,
            { id: id }
        );

        return toNativeTypes(
            result.records[0].get("d").properties
        );

    } finally {

        await session.close();

    }
}


// Get developer skills
async function getDeveloperSkills(developerId) {

    const session = driver.session();

    try {

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
            return null;
        }

        const record = result.records[0];

        return toNativeTypes({
            developer: record.get("developer"),

            skills: record.get("skills").map(skill => {
                return skill.properties;
            })
        });

    } finally {

        await session.close();

    }
}


// ---------------------------------------
// Get all skills (for populating the
// "Add Developer" form's skill picker)
// ---------------------------------------
async function getAllSkills() {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (s:Skill)
            RETURN s
            ORDER BY s.name
        `);

        return result.records.map(record => {
            return toNativeTypes(record.get("s").properties);
        });

    } finally {

        await session.close();

    }
}


// Get job recommendations
async function getJobRecommendations(developerId) {

    const session = driver.session();

    try {

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

                [
                    skill IN requiredSkills
                    WHERE NOT skill IN matchingSkills
                ] AS missingSkills,

                round(
                    100.0 *
                    size(matchingSkills) /
                    size(requiredSkills)
                ) AS matchPercentage

            ORDER BY matchPercentage DESC
            `,
            {
                developerId: developerId
            }
        );

        return result.records.map(record => {

            return toNativeTypes({
                jobId: record.get("jobId"),
                title: record.get("title"),
                location: record.get("location"),
                experience: record.get("experience"),
                company: record.get("company"),
                matchingSkills: record.get("matchingSkills"),
                requiredSkills: record.get("requiredSkills"),
                missingSkills: record.get("missingSkills"),
                matchPercentage: record.get("matchPercentage")
            });

        });

    } finally {

        await session.close();

    }
}


// Get all jobs
async function getAllJobs() {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (j:Job)
            OPTIONAL MATCH (c:Company)-[:POSTED]->(j)

            RETURN
                j,
                c.name AS company

            ORDER BY j.title
        `);

        return result.records.map(record => {

            const job = record.get("j").properties;

            return toNativeTypes({
                ...job,
                company: record.get("company")
            });

        });

    } finally {

        await session.close();

    }
}


// Get job by ID
async function getJobById(jobId) {

    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH (j:Job {id: $jobId})
            OPTIONAL MATCH (c:Company)-[:POSTED]->(j)

            OPTIONAL MATCH (j)-[:REQUIRES]->(s:Skill)

            RETURN
                j,
                c.name AS company,
                collect(s.name) AS requiredSkills
            `,
            {
                jobId: jobId
            }
        );

        if (result.records.length === 0) {
            return null;
        }

        const record = result.records[0];

        return toNativeTypes({
            ...record.get("j").properties,
            company: record.get("company"),
            requiredSkills: record.get("requiredSkills")
        });

    } finally {

        await session.close();

    }
}


// Get graph data for a developer
async function getDeveloperGraph(developerId) {

    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH path =
                (d:Developer {id: $developerId})
                -[*1..3]-
                (connected)

            WITH nodes(path) AS pathNodes,
                 relationships(path) AS pathRelationships

            UNWIND pathNodes AS node

            WITH
                collect(DISTINCT node) AS nodes,
                pathRelationships

            UNWIND pathRelationships AS relationship

            RETURN
                nodes,
                collect(DISTINCT relationship) AS relationships
            `,
            {
                developerId: developerId
            }
        );

        if (result.records.length === 0) {
            return null;
        }

        const record = result.records[0];

        const nodes = record.get("nodes").map(node => {

            return {
                id: node.properties.id,
                label: node.properties.name ||
                       node.properties.title ||
                       node.properties.id,
                type: node.labels[0],
                properties: node.properties
            };

        });

        const relationships =
            record.get("relationships").map(relationship => {

                return {
                    source: relationship.startNodeElementId,
                    target: relationship.endNodeElementId,
                    type: relationship.type
                };

            });

        return toNativeTypes({
            nodes,
            relationships
        });

    } finally {

        await session.close();

    }
}


module.exports = {
    getAllDevelopers,
    getDeveloperById,
    createDeveloper,
    getDeveloperSkills,
    getAllSkills,
    getJobRecommendations,
    getAllJobs,
    getJobById,
    getDeveloperGraph
};