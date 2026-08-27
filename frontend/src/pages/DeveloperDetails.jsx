import {
    Container,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Divider
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import { useParams } from "react-router-dom";

import {
    getDeveloper,
    getDeveloperSkills,
    getRecommendations
} from "../services/api";

import SkillChip from "../components/SkillChip";
import JobCard from "../components/JobCard";


function DeveloperDetails() {

    const { id } = useParams();

    const [developer, setDeveloper] = useState(null);
    const [skills, setSkills] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadDeveloper() {

            try {

                const [
                    developerResponse,
                    skillsResponse,
                    recommendationsResponse
                ] = await Promise.all([

                    getDeveloper(id),
                    getDeveloperSkills(id),
                    getRecommendations(id)

                ]);


                setDeveloper(
                    developerResponse.data.developer
                );


                setSkills(
                    skillsResponse.data.skills
                );


                setRecommendations(
                    recommendationsResponse.data
                        .recommendations
                );

            } catch (error) {

                console.error(
                    "Developer details error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        }


        loadDeveloper();

    }, [id]);


    if (loading) {

        return (

            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress sx={{ color: "#5B5FEF" }} />
            </Box>
        );
    }


    if (!developer) {

        return (

            <Container sx={{ mt: 5 }}>
                <Typography>Developer not found.</Typography>
            </Container>
        );
    }


    return (

        <Container sx={{ mt: 6, mb: 6 }}>

            

            <Box
                sx={{
                    p: 4,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 8px 32px rgba(91,95,239,0.12)"
                }}
            >

                <Box
                    sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #5B5FEF, #14B8A6)",
                        color: "#fff",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        mb: 2
                    }}
                >
                    {developer.name
                        ? developer.name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase()
                        : "?"}
                </Box>

                <Typography variant="h3">
                    {developer.name}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {developer.email}
                </Typography>

                <Typography className="mono" sx={{ mt: 1 }} color="#4144C4" fontWeight={600}>
                    {developer.experience} years experience
                </Typography>

            </Box>


            <Divider sx={{ my: 5, borderColor: "rgba(91,95,239,0.15)" }} />


            

            <Typography variant="h5">
                Skills
            </Typography>

            <Box sx={{ mt: 2 }}>

                {skills.map(skill => (
                    <SkillChip key={skill.id} skill={skill} />
                ))}

            </Box>


            <Divider sx={{ my: 5, borderColor: "rgba(91,95,239,0.15)" }} />


            

            <Typography variant="h5">
                Recommended Jobs
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Jobs matched using your skill graph.
            </Typography>

            <Grid container spacing={3}>

                {recommendations.map(job => (

                    <Grid size={{ xs: 12, md: 6 }} key={job.jobId}>
                        <JobCard job={job} />
                    </Grid>

                ))}

            </Grid>

        </Container>
    );
}


export default DeveloperDetails;
