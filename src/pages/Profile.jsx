import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, Button, Switch, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, TextField } from '@mui/material';
import { useHome } from '../contexts/HomeContext';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';

const Profile = () => {
    const { user } = useHome();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        // Implement logout logic here (clear tokens etc)
        navigate('/login');
    };

    return (
        <Box maxWidth="md">
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748', mb: 4 }}>
                Profile Settings
            </Typography>

            <Grid container spacing={4}>
                {/* Account Info */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                        <Avatar
                            src={user.avatar}
                            sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748' }}>{user.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3 }}>{user.email}</Typography>

                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Logout />}
                            fullWidth
                            onClick={handleLogout}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                            Log Out
                        </Button>
                    </Paper>
                </Grid>

                {/* Settings Forms */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: '#2D3748' }}>
                            Account Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Full Name" defaultValue={user.name} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Email" defaultValue={user.email} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Address" defaultValue="123 Smart Street, Tech City" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, textAlign: 'right' }}>
                            <Button variant="contained" sx={{ bgcolor: '#4FD1C5', '&:hover': { bgcolor: '#319795' }, textTransform: 'none', borderRadius: 2 }}>
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 4, borderRadius: 4 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#2D3748' }}>
                            Preferences
                        </Typography>
                        <List>
                            <ListItem disableGutters>
                                <ListItemText primary="Push Notifications" secondary="Receive alerts about your home" />
                                <ListItemSecondaryAction>
                                    <Switch checked={notifications} onChange={() => setNotifications(!notifications)} color="primary" />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem disableGutters>
                                <ListItemText primary="Dark Mode" secondary="Switch between light and dark themes" />
                                <ListItemSecondaryAction>
                                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
