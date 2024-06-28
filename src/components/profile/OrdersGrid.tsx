import React from 'react';
import { Box, Typography } from '@mui/material';
import Order from './Order';
import { useSelector } from 'react-redux';
import { RootState, useGetUserOrdersByStatusQuery } from '@/store';
import { skipToken } from '@reduxjs/toolkit/query';

/**
 * OrdersGrid component
 * Displays a grid of user orders.
 *
 * @returns {JSX.Element} The rendered OrdersGrid component.
 */
const OrdersGrid: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  
  const { data: orders, error, isLoading } = useGetUserOrdersByStatusQuery(
    userId ? { status: 'APPROVED' } : skipToken
  );

  if (!userId) {
    return <Typography>Error: Usuario no autenticado</Typography>;
  }

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error al cargar las órdenes</Typography>;

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto' , width: '730px'}}>
      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        MIS ORDENES APROVADAS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {orders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrdersGrid;
