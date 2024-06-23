// components/Profile.tsx
"use client";

import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const profile: ProfileData = {
    firstName: 'Pepita',
    lastName: 'Perez',
    birthDate: '2004-01-08',
    email: 'Test@Test.com',
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xs" sx={{ mt: 7, ml: 2, mb: 7 }}>
      <Paper elevation={3}
        sx={{
          p: 4,
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Mi Perfil
        </Typography>
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Nombres
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid #E5E5E5', borderRadius: 2 }}>
            {profile.firstName}
          </Typography>
        </Box>
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Apellidos
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid #E5E5E5', borderRadius: 2 }}>
            {profile.lastName}
          </Typography>
        </Box>
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Fecha de Nacimiento
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid #E5E5E5', borderRadius: 2 }}>
            {profile.birthDate}
          </Typography>
        </Box>
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid #E5E5E5', borderRadius: 2 }}>
            {profile.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Editar Perfil
          </Button>
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-title"
        aria-describedby="edit-profile-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Paper sx={{ p: 4, position: 'relative', borderRadius: '16px', width: '80%', maxWidth: '500px' }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="edit-profile-title" variant="h6" align="center" gutterBottom>
            Editar Información
          </Typography>
          <Typography variant="body2" align="center" gutterBottom sx={{ mb: 3, color: 'gray' }}>
            No modifiques los campos que no deseas cambiar.
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            
            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Contraseña"
              type="password"
              InputProps={{
                style: { color: 'black' }
              }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              id="confirm-password"
              label="Repetir Contraseña"
              type="password"
              InputProps={{
                style: { color: 'black' }
              }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" color="primary">
                Editar datos
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default Profile;
