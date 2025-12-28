import React from "react";
import { Box, Container, IconButton, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const WizardStepLayout = ({
    stepText = "Step 1/7",
    title,
    subtitle,
    onSkip,
    onContinue,
    children, // helper for main content
    headerExtra // helper for content inside the blue header (e.g. My Home card)
}) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F4F7FA", pb: 10 }}>
            {/* Header - Dark Blue Background */}
            <Box sx={{
                bgcolor: "#007BFF",
                pt: 4,
                pb: 12, // More padding bottom to allow overlap
                color: "#fff",
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                position: "relative"
            }}>
                <Container>
                    {/* Top Navigation Row */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <IconButton onClick={() => navigate(-1)} sx={{ color: "#fff" }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", px: 1.5, py: 0.5, borderRadius: 2 }}>
                            <Typography variant="caption" fontWeight="bold">{stepText}</Typography>
                        </Box>
                    </Box>

                    {/* Title Section */}
                    <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8 }}>
                            {subtitle}
                        </Typography>
                    )}
                </Container>
            </Box>

            {/* Main Content with Overlap Logic */}
            <Container sx={{ mt: -6 }}> {/* Negative margin to pull content up */}
                {children}
            </Container>

            {/* Sticky Footer */}
            <Box sx={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                bgcolor: "#fff", p: 2, borderTop: "1px solid #E2E8F0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
                zIndex: 100
            }}>
                <Button
                    onClick={onSkip}
                    sx={{ color: "#A0AEC0", textTransform: "none", fontWeight: 600, px: 3 }}
                >
                    Skip
                </Button>
                <Button
                    variant="contained"
                    onClick={onContinue}
                    sx={{
                        bgcolor: "#007BFF", color: "#fff", px: 4, py: 1, borderRadius: "10px",
                        textTransform: "none", fontWeight: 700,
                        "&:hover": { bgcolor: "#0056b3" },
                        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)"
                    }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
};

export default WizardStepLayout;
