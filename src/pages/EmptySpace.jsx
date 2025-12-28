import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import emptyIllustration from "../assets/icon/ChucNangWeb/image (2).png"; // Assuming image (2).png is the house/ghost illustration

const EmptySpace = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Box sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#fff", // White background as per mockup
                p: 3,
                textAlign: "center"
            }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#2D3748", mb: 1, fontSize: "1.5rem" }}>
                    Looks like you have no spaces set up.
                </Typography>

                <Typography variant="body1" sx={{ color: "#718096", mb: 6 }}>
                    Add your house and start your smart life!
                </Typography>

                {/* Illustration */}
                <Box sx={{ width: "100%", maxWidth: 300, mb: 6 }}>
                    <img
                        src={emptyIllustration}
                        alt="No Spaces"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={() => navigate("/link-devices")}
                    sx={{
                        bgcolor: "#007BFF", // Bright blue
                        color: "#fff",
                        borderRadius: "12px", // Rounded corners
                        px: 6,
                        py: 1.5,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#0069D9", boxShadow: "none" }
                    }}
                >
                    Set up your space
                </Button>
            </Box>
        </MainLayout>
    );
};

export default EmptySpace;
