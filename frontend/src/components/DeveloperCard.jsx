import {
    Card,
    CardContent,
    Typography,
    Button,
    Box
} from "@mui/material";

import { Link } from "react-router-dom";


function DeveloperCard({ developer }) {

    return (

        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
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


                <Typography
                    sx={{ mt: 1 }}
                >
                    Experience: {developer.experience} years
                </Typography>


                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    component={Link}
                    to={`/developers/${developer.id}`}
                >
                    View Profile
                </Button>

            </CardContent>

        </Card>

    );
}


export default DeveloperCard;