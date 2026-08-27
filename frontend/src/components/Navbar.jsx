import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";


function NavLink({ to, label, active }) {

    return (

        <Button
            component={Link}
            to={to}
            sx={{
                color: active ? "#5B5FEF" : "#1B1F3B",
                fontWeight: active ? 700 : 500,
                borderRadius: 999,
                px: 2.2,
                py: 0.7,
                backgroundColor: active
                    ? "rgba(91,95,239,0.12)"
                    : "transparent",
                "&:hover": {
                    backgroundColor: "rgba(91,95,239,0.08)"
                }
            }}
        >
            {label}
        </Button>

    );
}


function Navbar() {

    const location = useLocation();

    return (

        <AppBar
            position="sticky"
            elevation={0}
        >

            <Toolbar sx={{ py: 1, gap: 2 }}>

                {/* Logo mark: three connected nodes */}

                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        textDecoration: "none",
                        mr: 2
                    }}
                >

                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <line x1="7" y1="8" x2="15" y2="22" stroke="#5B5FEF" strokeWidth="2" opacity="0.5" />
                        <line x1="23" y1="8" x2="15" y2="22" stroke="#14B8A6" strokeWidth="2" opacity="0.5" />
                        <line x1="7" y1="8" x2="23" y2="8" stroke="#8C8FF5" strokeWidth="2" opacity="0.5" />
                        <circle cx="7" cy="8" r="4" fill="#5B5FEF" />
                        <circle cx="23" cy="8" r="4" fill="#14B8A6" />
                        <circle cx="15" cy="22" r="4" fill="#8C8FF5" />
                    </svg>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            background: "linear-gradient(90deg, #5B5FEF, #14B8A6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        SkillGraph
                    </Typography>

                </Box>


                <Box sx={{ flexGrow: 1 }} />


                <NavLink
                    to="/"
                    label="Dashboard"
                    active={location.pathname === "/"}
                />

                <NavLink
                    to="/developers"
                    label="Developers"
                    active={location.pathname.startsWith("/developers")}
                />

                <NavLink
                    to="/jobs"
                    label="Jobs"
                    active={location.pathname.startsWith("/jobs")}
                />

            </Toolbar>

        </AppBar>
    );
}


export default Navbar;
