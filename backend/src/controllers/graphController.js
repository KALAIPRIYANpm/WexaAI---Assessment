const graphService = require("../Services/graphService");



async function getDeveloperGraph(req, res) {

    try {

        const developerId = req.params.developerId;

        const graph =
            await graphService.getDeveloperGraph(developerId);

        if (!graph) {

            return res.status(404).json({
                success: false,
                message: "Developer graph not found"
            });

        }

        res.json({
            success: true,
            developerId: developerId,
            graph: graph
        });

    } catch (error) {

        console.error("Graph error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch graph"
        });
    }
}


module.exports = {
    getDeveloperGraph
};