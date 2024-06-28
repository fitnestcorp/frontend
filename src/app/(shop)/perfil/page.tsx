'use client';
import React from 'react';
import Profile from '@/components/profile/Profile';
import { Container, Box, Grid } from '@mui/material';
import OrdersGrid from '@/components/profile/OrdersGrid';
import { isAuth } from '@/components';

/**
 * ProfilePage page renders the user's profile and order grid.
 * It is wrapped with the isAuth HOC to ensure that the user is authenticated.
 *
 * @page
 * @example
 * return (
 *   <ProfilePage />
 * )
 */
const ProfilePage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12} md={4.5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box sx={{ width: '100%' }}>
            <Profile />
          </Box>
        </Grid>
        <Grid item xs={12} md={7.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <OrdersGrid />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

};

export default isAuth(ProfilePage);
