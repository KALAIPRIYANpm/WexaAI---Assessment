const driver = require("../src/db/neo4j");

async function seedDatabase() {

    const session = driver.session();

    try {

        console.log("Starting database seed...");

        // Clear existing database
        await session.run(`
            MATCH (n)
            DETACH DELETE n
        `);

        console.log("Existing data cleared.");


        // --------------------------------------------------
        // DEVELOPERS
        // --------------------------------------------------

        await session.run(`
            CREATE
            (d1:Developer {
                id: "dev1",
                name: "Arun Kumar",
                email: "arun@example.com",
                experience: 2
            }),

            (d2:Developer {
                id: "dev2",
                name: "Priya Sharma",
                email: "priya@example.com",
                experience: 3
            }),

            (d3:Developer {
                id: "dev3",
                name: "Rahul Kumar",
                email: "rahul@example.com",
                experience: 1
            })
        `);

        console.log("Developers created.");


        // --------------------------------------------------
        // SKILLS
        // --------------------------------------------------

        await session.run(`
            CREATE
            (s1:Skill {
                id: "skill1",
                name: "Java",
                category: "Backend"
            }),

            (s2:Skill {
                id: "skill2",
                name: "Spring Boot",
                category: "Backend"
            }),

            (s3:Skill {
                id: "skill3",
                name: "JavaScript",
                category: "Frontend"
            }),

            (s4:Skill {
                id: "skill4",
                name: "React",
                category: "Frontend"
            }),

            (s5:Skill {
                id: "skill5",
                name: "Node.js",
                category: "Backend"
            }),

            (s6:Skill {
                id: "skill6",
                name: "SQL",
                category: "Database"
            }),

            (s7:Skill {
                id: "skill7",
                name: "AWS",
                category: "Cloud"
            }),

            (s8:Skill {
                id: "skill8",
                name: "Docker",
                category: "DevOps"
            })
        `);

        console.log("Skills created.");


        // --------------------------------------------------
        // TECHNOLOGIES
        // --------------------------------------------------

        await session.run(`
            CREATE
            (t1:Technology {
                id: "tech1",
                name: "MySQL"
            }),

            (t2:Technology {
                id: "tech2",
                name: "MongoDB"
            }),

            (t3:Technology {
                id: "tech3",
                name: "REST API"
            }),

            (t4:Technology {
                id: "tech4",
                name: "Git"
            })
        `);

        console.log("Technologies created.");


        // --------------------------------------------------
        // PROJECTS
        // --------------------------------------------------

        await session.run(`
            CREATE
            (p1:Project {
                id: "project1",
                name: "Blood Donation Platform",
                description: "A platform connecting blood donors and recipients."
            }),

            (p2:Project {
                id: "project2",
                name: "Event Management System",
                description: "A system for managing events and registrations."
            }),

            (p3:Project {
                id: "project3",
                name: "E-Commerce Platform",
                description: "An online shopping application."
            })
        `);

        console.log("Projects created.");


        // --------------------------------------------------
        // COMPANIES
        // --------------------------------------------------

        await session.run(`
            CREATE
            (c1:Company {
                id: "company1",
                name: "TechNova",
                industry: "Software"
            }),

            (c2:Company {
                id: "company2",
                name: "CloudWorks",
                industry: "Cloud Computing"
            }),

            (c3:Company {
                id: "company3",
                name: "InnovateLabs",
                industry: "Technology"
            })
        `);

        console.log("Companies created.");


        // --------------------------------------------------
        // JOBS
        // --------------------------------------------------

        await session.run(`
            CREATE
            (j1:Job {
                id: "job1",
                title: "Java Backend Developer",
                location: "Bangalore",
                experience: 2
            }),

            (j2:Job {
                id: "job2",
                title: "Full Stack Developer",
                location: "Chennai",
                experience: 1
            }),

            (j3:Job {
                id: "job3",
                title: "Cloud Engineer",
                location: "Hyderabad",
                experience: 2
            }),

            (j4:Job {
                id: "job4",
                title: "React Developer",
                location: "Bangalore",
                experience: 1
            })
        `);

        console.log("Jobs created.");


        // --------------------------------------------------
        // DEVELOPER → SKILL
        // --------------------------------------------------

        await session.run(`
            MATCH
            (d1:Developer {id: "dev1"}),
            (d2:Developer {id: "dev2"}),
            (d3:Developer {id: "dev3"}),

            (java:Skill {id: "skill1"}),
            (spring:Skill {id: "skill2"}),
            (javascript:Skill {id: "skill3"}),
            (react:Skill {id: "skill4"}),
            (node:Skill {id: "skill5"}),
            (sql:Skill {id: "skill6"}),
            (aws:Skill {id: "skill7"}),
            (docker:Skill {id: "skill8"})

            CREATE
            (d1)-[:HAS_SKILL]->(java),
            (d1)-[:HAS_SKILL]->(spring),
            (d1)-[:HAS_SKILL]->(sql),

            (d2)-[:HAS_SKILL]->(javascript),
            (d2)-[:HAS_SKILL]->(react),
            (d2)-[:HAS_SKILL]->(node),
            (d2)-[:HAS_SKILL]->(sql),

            (d3)-[:HAS_SKILL]->(java),
            (d3)-[:HAS_SKILL]->(javascript),
            (d3)-[:HAS_SKILL]->(node)
        `);

        console.log("Developer skills connected.");


        // --------------------------------------------------
        // SKILL → RELATED SKILL
        // --------------------------------------------------

        await session.run(`
            MATCH
            (java:Skill {id: "skill1"}),
            (spring:Skill {id: "skill2"}),
            (javascript:Skill {id: "skill3"}),
            (react:Skill {id: "skill4"}),
            (node:Skill {id: "skill5"}),
            (sql:Skill {id: "skill6"}),
            (aws:Skill {id: "skill7"}),
            (docker:Skill {id: "skill8"})

            CREATE
            (java)-[:RELATED_TO]->(spring),
            (spring)-[:RELATED_TO]->(java),

            (javascript)-[:RELATED_TO]->(react),
            (react)-[:RELATED_TO]->(javascript),

            (javascript)-[:RELATED_TO]->(node),
            (node)-[:RELATED_TO]->(javascript),

            (aws)-[:RELATED_TO]->(docker),
            (docker)-[:RELATED_TO]->(aws)
        `);

        console.log("Related skills connected.");


        // --------------------------------------------------
        // PROJECT → TECHNOLOGY
        // --------------------------------------------------

        await session.run(`
            MATCH
            (p1:Project {id: "project1"}),
            (p2:Project {id: "project2"}),
            (p3:Project {id: "project3"}),

            (mysql:Technology {id: "tech1"}),
            (mongodb:Technology {id: "tech2"}),
            (rest:Technology {id: "tech3"}),
            (git:Technology {id: "tech4"})

            CREATE
            (p1)-[:USES]->(mysql),
            (p1)-[:USES]->(rest),
            (p1)-[:USES]->(git),

            (p2)-[:USES]->(mysql),
            (p2)-[:USES]->(rest),
            (p2)-[:USES]->(git),

            (p3)-[:USES]->(mongodb),
            (p3)-[:USES]->(rest),
            (p3)-[:USES]->(git)
        `);

        console.log("Project technologies connected.");


        // --------------------------------------------------
        // DEVELOPER → PROJECT
        // --------------------------------------------------

        await session.run(`
            MATCH
            (d1:Developer {id: "dev1"}),
            (d2:Developer {id: "dev2"}),
            (d3:Developer {id: "dev3"}),

            (p1:Project {id: "project1"}),
            (p2:Project {id: "project2"}),
            (p3:Project {id: "project3"})

            CREATE
            (d1)-[:WORKED_ON]->(p1),
            (d1)-[:WORKED_ON]->(p2),

            (d2)-[:WORKED_ON]->(p2),
            (d2)-[:WORKED_ON]->(p3),

            (d3)-[:WORKED_ON]->(p3)
        `);

        console.log("Developer projects connected.");


        // --------------------------------------------------
        // JOB → REQUIRED SKILLS
        // --------------------------------------------------

        await session.run(`
            MATCH
            (j1:Job {id: "job1"}),
            (j2:Job {id: "job2"}),
            (j3:Job {id: "job3"}),
            (j4:Job {id: "job4"}),

            (java:Skill {id: "skill1"}),
            (spring:Skill {id: "skill2"}),
            (javascript:Skill {id: "skill3"}),
            (react:Skill {id: "skill4"}),
            (node:Skill {id: "skill5"}),
            (sql:Skill {id: "skill6"}),
            (aws:Skill {id: "skill7"}),
            (docker:Skill {id: "skill8"})

            CREATE
            (j1)-[:REQUIRES]->(java),
            (j1)-[:REQUIRES]->(spring),
            (j1)-[:REQUIRES]->(sql),

            (j2)-[:REQUIRES]->(javascript),
            (j2)-[:REQUIRES]->(react),
            (j2)-[:REQUIRES]->(node),
            (j2)-[:REQUIRES]->(sql),

            (j3)-[:REQUIRES]->(aws),
            (j3)-[:REQUIRES]->(docker),

            (j4)-[:REQUIRES]->(javascript),
            (j4)-[:REQUIRES]->(react)
        `);

        console.log("Job requirements connected.");


        // --------------------------------------------------
        // COMPANY → JOB
        // --------------------------------------------------

        await session.run(`
            MATCH
            (c1:Company {id: "company1"}),
            (c2:Company {id: "company2"}),
            (c3:Company {id: "company3"}),

            (j1:Job {id: "job1"}),
            (j2:Job {id: "job2"}),
            (j3:Job {id: "job3"}),
            (j4:Job {id: "job4"})

            CREATE
            (c1)-[:POSTED]->(j1),
            (c1)-[:POSTED]->(j2),

            (c2)-[:POSTED]->(j3),

            (c3)-[:POSTED]->(j4)
        `);

        console.log("Companies and jobs connected.");

        console.log("=================================");
        console.log("Database seeded successfully!");
        console.log("=================================");

    } catch (error) {

        console.error("Seed error:");
        console.error(error);

    } finally {

        await session.close();
        await driver.close();

    }
}

seedDatabase();