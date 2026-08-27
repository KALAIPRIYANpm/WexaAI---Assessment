import { Chip } from "@mui/material";


function SkillChip({ skill }) {

    return (

        <Chip
            label={skill.name}
            size="medium"
            sx={{
                mr: 1,
                mb: 1,
                backgroundColor: "rgba(20,184,166,0.14)",
                color: "#0F8A7C",
                fontWeight: 600,
                border: "1px solid rgba(20,184,166,0.25)"
            }}
        />

    );
}


export default SkillChip;
