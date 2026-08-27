import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip
} from "@mui/material";

import { Link } from "react-router-dom";


function getInitials(name) {

    if (!name) return "?";

    return name
        .split(" ")
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}


function DeveloperCard({ developer }) {

    return (

        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

            <CardContent sx={{ flexGrow: 1 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: "linear-gradient(135deg, #5B5FEF, #14B8A6)",
                            color: "#fff",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700
                        }}
                    >
                        {getInitials(developer.name)}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            noWrap
                        >
                            {developer.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                        >
                            {developer.email}
                        </Typography>

                    </Box>

                </Box>


                <Chip
                    className="mono"
                    label={`${developer.experience} yrs experience`}
                    size="small"
                    sx={{
                        mt: 2,
                        backgroundColor: "rgba(91,95,239,0.1)",
                        color: "#4144C4"
                    }}
                />


                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2.5 }}
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
