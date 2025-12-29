import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Avatar, AvatarGroup, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { useHome } from '../contexts/HomeContext';
import CreateSpaceStep1 from './CreateSpaceStep1';

const Spaces = () => {
    const { spaces, addSpace } = useHome();
    const [open, setOpen] = useState(false);
    const [newSpace, setNewSpace] = useState({ name: '', address: '' });

    // Show empty state if no spaces
    if (!spaces || spaces.length === 0) {
        return <CreateSpaceStep1 />;
    }

    const handleCreate = () => {
        if (newSpace.name && newSpace.address) {
            addSpace({
                ...newSpace,
                // Default mock values for new space
                rooms: 0,
                devices: 0,
                members: 1
            });
            setOpen(false);
            setNewSpace({ name: '', address: '' });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748' }}>
                    My Spaces
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{
                        bgcolor: '#4FD1C5',
                        boxShadow: '0 4px 14px 0 rgba(79, 209, 197, 0.4)',
                        '&:hover': { bgcolor: '#38B2AC' },
                        borderRadius: 3,
                        textTransform: 'none',
                        px: 3
                    }}
                >
                    Add New Space
                </Button>
            </Box>

            <Grid container spacing={4}>
                {spaces.map((space) => (
                    <Grid item xs={12} md={6} lg={4} key={space.id}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            {/* Space Image Header */}
                            <Box sx={{ height: 140, bgcolor: '#F7FAFC', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img
                                    src={space.image}
                                    alt={space.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    size="small"
                                    sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>

                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748', mb: 1 }}>
                                {space.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#718096', mb: 3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {space.address}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748', lineHeight: 1 }}>{space.rooms}</Typography>
                                        <Typography variant="caption" sx={{ color: '#A0AEC0' }}>Rooms</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748', lineHeight: 1 }}>{space.devices}</Typography>
                                        <Typography variant="caption" sx={{ color: '#A0AEC0' }}>Devices</Typography>
                                    </Box>
                                </Box>

                                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: '0.75rem' } }}>
                                    <Avatar alt="Member 1" src="https://i.pravatar.cc/150?u=1" />
                                    <Avatar alt="Member 2" src="https://i.pravatar.cc/150?u=2" />
                                    <Avatar alt="Member 3" src="https://i.pravatar.cc/150?u=3" />
                                </AvatarGroup>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Add Space Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle fontWeight="bold">Add New Space</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        Create a new space to manage your devices.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Space Name"
                        fullWidth
                        variant="outlined"
                        value={newSpace.name}
                        onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        value={newSpace.address}
                        onChange={(e) => setNewSpace({ ...newSpace, address: e.target.value })}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)} sx={{ color: '#718096' }}>Cancel</Button>
                    <Button
                        onClick={handleCreate}
                        variant="contained"
                        disabled={!newSpace.name || !newSpace.address}
                        sx={{ bgcolor: '#4FD1C5', '&:hover': { bgcolor: '#38B2AC' } }}
                    >
                        Create Space
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Spaces;
