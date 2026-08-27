import {
    Container,
    Typography,
    Grid,
    CircularProgress,
    Box,
    Button
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import {
    getDevelopers
} from "../services/api";

import DeveloperCard from "../components/DeveloperCard";


function Developers() {

    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadDevelopers() {

            try {

                const response = await getDevelopers();

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

        <Container sx={{ mt: 6, mb: 6 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4
                }}
            >

                <Typography variant="h3">
                    Developers
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/developers/add"
                >
                    Add Developer
                </Button>

            </Box>


            {loading ? (

                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress sx={{ color: "#5B5FEF" }} />
                </Box>

            ) : (

                <Grid container spacing={3}>

                    {developers.map(developer => (

                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={developer.id}>
                            <DeveloperCard developer={developer} />
                        </Grid>

                    ))}

                </Grid>

            )}

        </Container>
    );
}


export default Developers;
