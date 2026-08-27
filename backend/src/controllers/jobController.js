const graphService = require("../Services/graphService");


async function getAllJobs(req, res) {

    try {

        const jobs = await graphService.getAllJobs();

        res.json({
            success: true,
            count: jobs.length,
            jobs: jobs
        });

    } catch (error) {

        console.error("Error fetching jobs:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs"
        });
    }
}


async function getJobById(req, res) {

    try {

        const jobId = req.params.id;

        const job = await graphService.getJobById(jobId);

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });

        }

        res.json({
            success: true,
            job: job
        });

    } catch (error) {

        console.error("Error fetching job:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch job"
        });
    }
}


async function getJobRecommendations(req, res) {

    try {

        const developerId = req.params.developerId;

        const recommendations =
            await graphService.getJobRecommendations(developerId);

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
            message: "Failed to generate job recommendations"
        });
    }
}


module.exports = {
    getAllJobs,
    getJobById,
    getJobRecommendations
};