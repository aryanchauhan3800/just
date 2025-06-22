import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Visibility,
  Edit,
  SwapHoriz,
  Close,
  SettingsRounded as SettingsRoundedIcon,
  HomeRounded,
} from '@mui/icons-material';

const ActionCell = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openTransferModal, setOpenTransferModal] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleView = () => {
    handleMenuClose();
    console.log('View Item Details:', row);
  };

  const handleEdit = () => {
    handleMenuClose();
    console.log('Edit Item Details:', row);
  };

  const handleTransfer = () => {
    handleMenuClose();
    setOpenTransferModal(true);
  };

  const handleTransferSubmit = () => {
    console.log('Transfer submitted!');
    setOpenTransferModal(false);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon style={{ color: '#9ca3af' }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleView}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText primary="View Item Details" />
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText primary="Edit Item Details" />
        </MenuItem>
        <MenuItem onClick={handleTransfer}>
          <ListItemIcon><SwapHoriz fontSize="small" style={{ color: 'red' }} /></ListItemIcon>
          <ListItemText
            primary="Transfer Inventory stock"
            primaryTypographyProps={{ style: { color: 'red' } }}
          />
        </MenuItem>
      </Menu>

      {/* Transfer Inventory Modal */}
      <Dialog open={openTransferModal} onClose={() => setOpenTransferModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Warehouse Stock & Inventory
          <IconButton onClick={() => setOpenTransferModal(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* From Location */}
          <Paper elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2.5, maxWidth: 600, mb: 3 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Box sx={{ background: '#F9FAFB', p: 1, borderRadius: 2, mr: 1.5 }}>
                <HomeRounded sx={{ fontSize: 22, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Pratapgarh</Typography>
                <Typography variant="body2" color="text.secondary">42-7 Bleeker Street, Mahavir Singh Colony</Typography>
              </Box>
            </Box>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="#000" mb={0.5}>Batch Name :</Typography>
                <TextField
                  fullWidth
                  value="BT-000001"
                  placeholder="BT-000001"
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SettingsRoundedIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="error.main" mb={0.5}>* Current Stock in warehouse :</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter how many adding"
                  margin="dense"
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="error.main" mb={0.5}>* Low Stock Alert :</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Number"
                  margin="dense"
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* To Location */}
          <Paper elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2.5, maxWidth: 600 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Box sx={{ background: '#F9FAFB', p: 1, borderRadius: 2, mr: 1.5 }}>
                <HomeRounded sx={{ fontSize: 22, color: '#9CA3AF' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Zamin Zilla</Typography>
                <Typography variant="body2" color="text.secondary">42-7 Bleeker Street, Mahavir Singh Colony</Typography>
              </Box>
            </Box>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="#000" mb={0.5}>Batch Name :</Typography>
                <TextField
                  fullWidth
                  value="BT-000001"
                  placeholder="BT-000001"
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SettingsRoundedIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="error.main" mb={0.5}>* Current Stock in warehouse :</Typography>
                <TextField
                  fullWidth
                  placeholder="12"
                  margin="dense"
                  value="12"
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontSize={13} fontWeight={500} color="error.main" mb={0.5}>* Low Stock Alert :</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Number"
                  margin="dense"
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenTransferModal(false)}>Cancel</Button>
          <Button onClick={handleTransferSubmit} variant="contained" color="primary">
            Transfer Stock
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionCell;