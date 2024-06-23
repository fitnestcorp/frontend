// pages/ProfilePage.tsx
import React from 'react';
import Profile from '@/components/profile/Profile';
import { Container, Box, Grid } from '@mui/material';
import OrdersGrid from '@/components/profile/OrdersGrid';

export const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 6 }}>
            <Profile />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '100%', overflowY: 'auto', mb: 6 }}>
            <OrdersGrid />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
