import {
    Container,
    Typography,
    Grid,
    CircularProgress,
    Box
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import { getJobs } from "../services/api";

import JobCard from "../components/JobCard";


function Jobs() {

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadJobs() {

            try {

                const response =
                    await getJobs();

                setJobs(
                    response.data.jobs
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        }


        loadJobs();

    }, []);


    return (

        <Container
            sx={{
                mt: 5,
                mb: 5
            }}
        >

            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 4 }}
            >
                Jobs
            </Typography>


            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            ) : (

                <Grid
                    container
                    spacing={3}
                >

                    {jobs.map(job => (

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

                    ))}

                </Grid>

            )}

        </Container>
    );
}


export default Jobs;