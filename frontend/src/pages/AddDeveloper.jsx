import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Autocomplete,
    Chip,
    Alert
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
    createDeveloper,
    getSkills
} from "../services/api";


function AddDeveloper() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [experience, setExperience] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [skillOptions, setSkillOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadSkills() {

            try {

                const response = await getSkills();

                setSkillOptions(
                    response.data.skills.map(skill => skill.name)
                );

            } catch (err) {

                console.error("Error loading skills:", err);

            }
        }


        loadSkills();

    }, []);


    async function handleSubmit(event) {

        event.preventDefault();

        setError(null);

        if (!name.trim() || !email.trim() || experience === "") {

            setError("Name, email and experience are required.");
            return;
        }

        setSubmitting(true);

        try {

            const response = await createDeveloper({
                name: name.trim(),
                email: email.trim(),
                experience: Number(experience),
                skills: selectedSkills
            });

            const newDeveloper = response.data.developer;

            navigate(`/developers/${newDeveloper.id}`);

        } catch (err) {

            console.error("Error creating developer:", err);

            setError("Something went wrong while saving. Please try again.");

        } finally {

            setSubmitting(false);

        }
    }


    return (

        <Container sx={{ mt: 6, mb: 6, maxWidth: "sm !important" }}>

            <Typography variant="h3" sx={{ mb: 1 }}>
                Add Developer
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Add a new developer to the skill graph.
            </Typography>


            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 4,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 8px 32px rgba(91,95,239,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}
            >

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Years of experience"
                    type="number"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    fullWidth
                    required
                    inputProps={{ min: 0, step: 1 }}
                />

                <Autocomplete
                    multiple
                    options={skillOptions}
                    value={selectedSkills}
                    onChange={(event, newValue) => setSelectedSkills(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                                key={option}
                                sx={{
                                    backgroundColor: "rgba(20,184,166,0.14)",
                                    color: "#0F8A7C"
                                }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Skills"
                            placeholder="Select skills"
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{ alignSelf: "flex-start" }}
                >
                    {submitting ? "Saving..." : "Save Developer"}
                </Button>

            </Box>

        </Container>
    );
}


export default AddDeveloper;
