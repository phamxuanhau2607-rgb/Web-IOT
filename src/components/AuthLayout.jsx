import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const AuthLayout = ({ illustration, children, title, subtitle }) => {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
            <Grid container sx={{ minHeight: "100vh" }}>
                {/* Left Column: Illustration (40%) */}
                {/* User requested 40% width. Grid system: 12 columns. 40% is approx 5/12 (41.6%) */}
                <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                        bgcolor: "#F4F7FA",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        p: 4
                    }}
                >
                    {illustration && (
                        <Box sx={{ width: "100%", maxWidth: 400, mb: 4 }}>
                            <img
                                src={illustration}
                                alt="Illustration"
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        </Box>
                    )}
                    {title && (
                        <Typography variant="h4" fontWeight="bold" sx={{ color: "#2D3748", mb: 2, textAlign: "center" }}>
                            {title}
                        </Typography>
                    )}
                    {subtitle && (
                        <Typography variant="body1" sx={{ color: "#718096", textAlign: "center", maxWidth: 300 }}>
                            {subtitle}
                        </Typography>
                    )}
                </Grid>

                {/* Right Column: Form (60%) */}
                <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 4
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 450 }}>
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthLayout;
