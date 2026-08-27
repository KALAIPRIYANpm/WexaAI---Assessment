import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    LinearProgress
} from "@mui/material";


function JobCard({ job }) {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {job.title}
                </Typography>


                <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {job.company}
                </Typography>


                <Typography sx={{ mt: 1 }}>
                    📍 {job.location}
                </Typography>


                <Typography sx={{ mt: 1 }}>
                    Experience: {job.experience} years
                </Typography>


                {job.matchPercentage !== undefined && (

                    <Box sx={{ mt: 2 }}>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >

                            <Typography>
                                Skill Match
                            </Typography>

                            <Typography fontWeight="bold">
                                {job.matchPercentage}%
                            </Typography>

                        </Box>


                        <LinearProgress
                            variant="determinate"
                            value={job.matchPercentage}
                            sx={{
                                mt: 1,
                                height: 8,
                                borderRadius: 5
                            }}
                        />

                    </Box>

                )}


                {job.matchingSkills && (

                    <Box sx={{ mt: 2 }}>

                        <Typography
                            variant="subtitle2"
                        >
                            Matching Skills
                        </Typography>


                        {job.matchingSkills.map(
                            (skill) => (

                                <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    sx={{
                                        mr: 0.5,
                                        mt: 0.5
                                    }}
                                />

                            )
                        )}

                    </Box>

                )}


                {job.missingSkills &&
                    job.missingSkills.length > 0 && (

                    <Box sx={{ mt: 2 }}>

                        <Typography
                            variant="subtitle2"
                        >
                            Missing Skills
                        </Typography>


                        {job.missingSkills.map(
                            (skill) => (

                                <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        mr: 0.5,
                                        mt: 0.5
                                    }}
                                />

                            )
                        )}

                    </Box>

                )}

            </CardContent>

        </Card>
    );
}


export default JobCard;