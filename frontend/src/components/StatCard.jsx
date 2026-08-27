import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";


function StatCard({ title, value }) {

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent sx={{ py: 3 }}>

                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Box sx={{ mt: 1 }}>

                    <Typography
                        className="mono"
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            background: "linear-gradient(90deg, #5B5FEF, #14B8A6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        {value}
                    </Typography>

                </Box>

            </CardContent>

        </Card>

    );
}


export default StatCard;
