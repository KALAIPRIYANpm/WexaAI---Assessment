import {
    Container,
    Typography,
    Grid,
    Box
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getDevelopers,
    getJobs
} from "../services/api";

import DeveloperCard from "../components/DeveloperCard";
import JobCard from "../components/JobCard";
import StatCard from "../components/StatCard";


function Dashboard() {

    const [developers, setDevelopers] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadData() {

            try {

                const [
                    developersResponse,
                    jobsResponse
                ] = await Promise.all([
                    getDevelopers(),
                    getJobs()
                ]);


                setDevelopers(
                    developersResponse.data.developers
                );


                setJobs(
                    jobsResponse.data.jobs
                );

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        }


        loadData();

    }, []);


    if (loading) {

        return (
            <Container sx={{ mt: 5 }}>
                <Typography>
                    Loading SkillGraph...
                </Typography>
            </Container>
        );
    }


    return (

        <Container sx={{ mt: 5, mb: 5 }}>

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                SkillGraph Dashboard
            </Typography>


            <Typography
                color="text.secondary"
                sx={{ mt: 1, mb: 4 }}
            >
                Explore developers, skills and
                intelligent job recommendations.
            </Typography>


            {/* Statistics */}

            <Grid
                container
                spacing={3}
                sx={{ mb: 5 }}
            >

                <Grid item xs={12} sm={4}>

                    <StatCard
                        title="Developers"
                        value={developers.length}
                    />

                </Grid>


                <Grid item xs={12} sm={4}>

                    <StatCard
                        title="Jobs"
                        value={jobs.length}
                    />

                </Grid>


                <Grid item xs={12} sm={4}>

                    <StatCard
                        title="Skills"
                        value="8"
                    />

                </Grid>

            </Grid>


            {/* Developers */}

            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 3 }}
            >
                Developers
            </Typography>


            <Grid
                container
                spacing={3}
            >

                {developers.map(
                    (developer) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={developer.id}
                        >

                            <DeveloperCard
                                developer={developer}
                            />

                        </Grid>

                    )
                )}

            </Grid>


            {/* Jobs */}

            <Box sx={{ mt: 6 }}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                >
                    Available Jobs
                </Typography>


                <Grid
                    container
                    spacing={3}
                >

                    {jobs.map(
                        (job) => (

                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={job.id}
                            >

                                <JobCard
                                    job={job}
                                />

                            </Grid>

                        )
                    )}

                </Grid>

            </Box>

        </Container>
    );
}


export default Dashboard;