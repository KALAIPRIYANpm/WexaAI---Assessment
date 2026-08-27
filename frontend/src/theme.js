import { createTheme } from "@mui/material/styles";


const theme = createTheme({

    palette: {
        mode: "light",
        primary: {
            main: "#5B5FEF",
            light: "#8C8FF5",
            dark: "#4144C4",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#14B8A6",
            light: "#5EEAD4",
            dark: "#0F8A7C",
            contrastText: "#FFFFFF"
        },
        error: {
            main: "#F97066"
        },
        background: {
            default: "transparent",
            paper: "rgba(255,255,255,0.6)"
        },
        text: {
            primary: "#1B1F3B",
            secondary: "#6B7280"
        }
    },

    shape: {
        borderRadius: 18
    },

    typography: {
        fontFamily: "'Inter', system-ui, sans-serif",

        h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
        h2: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
        h3: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
        h4: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" },
        h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
        h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },

        subtitle2: {
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
            fontSize: "0.72rem"
        },

        button: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textTransform: "none"
        }
    },

    components: {

        MuiCard: {
            styleOverrides: {
                root: {
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderRadius: 20,
                    boxShadow: "0 8px 32px rgba(91,95,239,0.12)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 16px 40px rgba(91,95,239,0.18)"
                    }
                }
            }
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 4px 24px rgba(91,95,239,0.08)"
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingLeft: 20,
                    paddingRight: 20,
                    boxShadow: "none"
                },
                contained: {
                    boxShadow: "0 4px 14px rgba(91,95,239,0.28)",
                    "&:hover": {
                        boxShadow: "0 6px 20px rgba(91,95,239,0.36)"
                    }
                }
            }
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                }
            }
        },

        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    backgroundColor: "rgba(91,95,239,0.12)"
                },
                bar: {
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #5B5FEF, #14B8A6)"
                }
            }
        }
    }
});


export default theme;