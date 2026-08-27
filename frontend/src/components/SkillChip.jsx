import { Chip } from "@mui/material";


function SkillChip({ skill }) {

    return (

        <Chip
            label={skill.name || skill}
            sx={{
                margin: "4px"
            }}
        />

    );
}


export default SkillChip;