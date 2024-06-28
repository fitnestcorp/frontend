import React from 'react';
import { Box, Typography } from '@mui/material';
import Order from './Order';
import { useSelector } from 'react-redux';
import { RootState, useGetUserStatusQuery } from '@/store';
import { skipToken } from '@reduxjs/toolkit/query';

/**
 * OrdersGrid component
 * Displays a grid of user orders.
 *
 * @returns {JSX.Element} The rendered OrdersGrid component.
 */
const OrdersGrid: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  
  const { data: user, error, isLoading } = useGetUserStatusQuery(userId ?? skipToken);

  if (!userId) {
    return <Typography>Error: Usuario no autenticado</Typography>;
  }

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error al cargar las órdenes</Typography>;
  console.log("user", user)
  const orders = user?.orders || [];
  console.log("or", orders)
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        MIS ORDENES
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {orders.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrdersGrid;
