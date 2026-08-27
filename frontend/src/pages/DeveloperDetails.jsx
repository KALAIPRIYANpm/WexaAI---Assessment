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


    const [developer, setDeveloper] =
        useState(null);

    const [skills, setSkills] =
        useState([]);

    const [recommendations, setRecommendations] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10
                }}
            >

                <CircularProgress />

            </Box>
        );
    }


    if (!developer) {

        return (

            <Container sx={{ mt: 5 }}>

                <Typography>
                    Developer not found.
                </Typography>

            </Container>
        );
    }


    return (

        <Container
            sx={{
                mt: 5,
                mb: 5
            }}
        >

            {/* Developer information */}

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                {developer.name}
            </Typography>


            <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                {developer.email}
            </Typography>


            <Typography sx={{ mt: 1 }}>
                Experience: {developer.experience} years
            </Typography>


            <Divider sx={{ my: 4 }} />


            {/* Skills */}

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                Skills
            </Typography>


            <Box sx={{ mt: 2 }}>

                {skills.map(skill => (

                    <SkillChip
                        key={skill.id}
                        skill={skill}
                    />

                ))}

            </Box>


            <Divider sx={{ my: 5 }} />


            {/* Recommendations */}

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                Recommended Jobs
            </Typography>


            <Typography
                color="text.secondary"
                sx={{ mt: 1, mb: 3 }}
            >
                Jobs matched using your skill graph.
            </Typography>


            <Grid
                container
                spacing={3}
            >

                {recommendations.map(job => (

                    <Grid
                        item
                        xs={12}
                        md={6}
                        key={job.jobId}
                    >

                        <JobCard
                            job={job}
                        />

                    </Grid>

                ))}

            </Grid>

        </Container>
    );
}


export default DeveloperDetails;