import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import { Link } from "react-router-dom";


function Navbar() {

    return (
        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold"
                    }}
                >
                    SkillGraph
                </Typography>


                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    Dashboard
                </Button>


                <Button
                    color="inherit"
                    component={Link}
                    to="/developers"
                >
                    Developers
                </Button>


                <Button
                    color="inherit"
                    component={Link}
                    to="/jobs"
                >
                    Jobs
                </Button>

            </Toolbar>

        </AppBar>
    );
}


export default Navbar;