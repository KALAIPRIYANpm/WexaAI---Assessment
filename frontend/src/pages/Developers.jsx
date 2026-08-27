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

import {
    getDevelopers
} from "../services/api";

import DeveloperCard from "../components/DeveloperCard";


function Developers() {

    const [developers, setDevelopers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadDevelopers() {

            try {

                const response =
                    await getDevelopers();

                setDevelopers(
                    response.data.developers
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        }


        loadDevelopers();

    }, []);


    return (

        <Container sx={{ mt: 5 }}>

            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 4 }}
            >
                Developers
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

                    {developers.map(
                        developer => (

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

            )}

        </Container>
    );
}


export default Developers;