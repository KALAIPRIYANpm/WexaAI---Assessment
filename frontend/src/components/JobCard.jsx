import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip
} from "@mui/material";


function MatchGauge({ percentage }) {

    const size = 64;
    const stroke = 6;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);

    return (

        <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>

            <svg width={size} height={size}>

                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#5B5FEF" />
                        <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                </defs>

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(91,95,239,0.12)"
                    strokeWidth={stroke}
                />

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />

            </svg>

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography
                    className="mono"
                    variant="body2"
                    fontWeight={700}
                    color="#4144C4"
                >
                    {percentage}%
                </Typography>
            </Box>

        </Box>
    );
}


function JobCard({ job }) {

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>

                    <Box sx={{ minWidth: 0 }}>

                        <Typography variant="h6" fontWeight={700} noWrap>
                            {job.title}
                        </Typography>

                        <Typography color="text.secondary" sx={{ mt: 0.3 }}>
                            {job.company}
                        </Typography>

                    </Box>

                    {job.matchPercentage !== undefined && (
                        <MatchGauge percentage={job.matchPercentage} />
                    )}

                </Box>


                <Box sx={{ display: "flex", gap: 2.5, mt: 2 }}>

                    <Typography variant="body2" color="text.secondary">
                        📍 {job.location}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" className="mono">
                        {job.experience} yrs
                    </Typography>

                </Box>


                {job.matchingSkills && job.matchingSkills.length > 0 && (

                    <Box sx={{ mt: 2.5 }}>

                        <Typography variant="subtitle2" color="text.secondary">
                            Matching Skills
                        </Typography>

                        <Box sx={{ mt: 1 }}>

                            {job.matchingSkills.map(skill => (

                                <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    sx={{
                                        mr: 0.7,
                                        mt: 0.5,
                                        backgroundColor: "rgba(20,184,166,0.14)",
                                        color: "#0F8A7C",
                                        border: "1px solid rgba(20,184,166,0.25)"
                                    }}
                                />

                            ))}

                        </Box>

                    </Box>

                )}


                {job.missingSkills && job.missingSkills.length > 0 && (

                    <Box sx={{ mt: 2 }}>

                        <Typography variant="subtitle2" color="text.secondary">
                            Missing Skills
                        </Typography>

                        <Box sx={{ mt: 1 }}>

                            {job.missingSkills.map(skill => (

                                <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        mr: 0.7,
                                        mt: 0.5,
                                        borderColor: "rgba(249,112,102,0.4)",
                                        color: "#D9463C"
                                    }}
                                />

                            ))}

                        </Box>

                    </Box>

                )}

            </CardContent>

        </Card>
    );
}


export default JobCard;
