'use client';
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useGetUserOrdersByStatusQuery } from '@/store';
import { skipToken } from '@reduxjs/toolkit/query';
import Order from '@/components/profile/Order';
import { LogoLoader } from '@/components';

const OrdersGrid: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const { data: approvedOrders, error: approvedError, isLoading: approvedLoading } = useGetUserOrdersByStatusQuery(
    userId ? { status: 'APPROVED' } : skipToken
  );

  const { data: declinedOrders, error: declinedError, isLoading: declinedLoading } = useGetUserOrdersByStatusQuery(
    userId ? { status: 'DENIED' } : skipToken
  );

  const { data: waitingOrders, error: waitingError, isLoading: waitingLoading } = useGetUserOrdersByStatusQuery(
    userId ? { status: 'WAITING' } : skipToken
  );

  if (!userId) {
    return <Typography>Error: Usuario no autenticado</Typography>;
  }

  if (approvedLoading || declinedLoading || waitingLoading) {
    return <LogoLoader/>
  }

  if (approvedError || declinedError || waitingError) {
    return <LogoLoader/>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        MIS ORDENES APROBADAS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: '80%', width: '100%' }}>
        {approvedOrders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </Box>

      <Divider sx={{ my: 6, width: '100%' }} />

      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        MIS ORDENES RECHAZADAS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: '80%', width: '100%' }}>
        {declinedOrders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </Box>

      <Divider sx={{ my: 6, width: '100%' }} />

      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        MIS ORDENES EN ESPERA
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: '80%', width: '100%' }}>
        {waitingOrders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrdersGrid;