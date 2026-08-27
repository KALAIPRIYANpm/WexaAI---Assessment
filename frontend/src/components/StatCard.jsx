import {
    Card,
    CardContent,
    Typography
} from "@mui/material";


function StatCard({ title, value }) {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    color="text.secondary"
                >
                    {title}
                </Typography>


                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                >
                    {value}
                </Typography>

            </CardContent>

        </Card>

    );
}


export default StatCard;