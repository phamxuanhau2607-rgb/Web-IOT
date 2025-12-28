import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DeviceCard = ({ icon, image, name, status, isConnected }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "20px",
        p: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        border: "1px solid transparent",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "#007BFF",
          boxShadow: "0 8px 20px rgba(0, 123, 255, 0.1)",
          transform: "translateY(-4px)"
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        minHeight: 170
      }}
    >
      {/* Icon Circle */}
      <Box sx={{
        width: 50, height: 50, borderRadius: "16px", bgcolor: isConnected ? "#E6FFFA" : "#F7FAFC",
        display: "flex", alignItems: "center", justifyContent: "center", mb: 2,
        color: isConnected ? "#38A169" : "#718096",
        overflow: 'hidden'
      }}>
        {image ? (
          <img src={image} alt={name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        ) : (
          icon
        )}
      </Box>

      {/* Text Info */}
      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#2D3748", mb: 0.5, fontSize: "1rem" }}>
        {name}
      </Typography>
      <Typography variant="caption" sx={{ color: isConnected ? "#38A169" : "#A0AEC0", fontWeight: 600 }}>
        {isConnected ? "Connected" : status || "Not Connected"}
      </Typography>

      {/* Add / Remove Button */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          bgcolor: isConnected ? "#FFEBF0" : "#F0F7FF",
          color: isConnected ? "#E53E3E" : "#007BFF",
          width: 36, height: 36,
          borderRadius: "12px",
          "&:hover": {
            bgcolor: isConnected ? "#FED7E2" : "#EBF8FF"
          }
        }}
      >
        {isConnected ? <DeleteOutlineIcon fontSize="small" /> : <AddIcon fontSize="small" />}
      </IconButton>
    </Box>
  );
};

export default DeviceCard;
