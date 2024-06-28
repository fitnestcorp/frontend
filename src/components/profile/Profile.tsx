"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Button, Modal, TextField, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RootState, useUpdateUserMutation } from '@/store'; // Ajusta la ruta según tu estructura de archivos

/**
 * Interface representing the user's profile data.
 */
interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

/**
 * Profile component to display and edit user's profile information.
 *
 * @returns {JSX.Element} The rendered Profile component.
 */
const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <Container disableGutters maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="warning">Por favor, inicia sesión para ver tu perfil.</Alert>
      </Container>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      await updateUser({ id_user: user.id, updateUserDto: { password: formData.password } }).unwrap();
      handleClose(); 
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrorMessage('Failed to update user');
    }
  };

  const profile: ProfileData = {
    firstName: user.first_name,
    lastName: user.last_name,
    birthDate: user.birth_date,
    email: user.email,
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ mb: 7 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        MI PERFIL
      </Typography>
      <Paper elevation={3}
        sx={{
          p: 4,
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          mt: 4 
        }}
      >
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
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                style: { color: 'black' }
              }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, fontWeight: 'bold' }}>
              <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? 'Actualizando...' : 'Editar contraseña'}
              </Button>
            </Box>
            {isError && <Alert severity="error" sx={{ mt: 2 }}>Error al actualizar la contraseña</Alert>}
            {isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Contraseña actualizada con éxito</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default Profile;
