// components/Order.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import OrderItem from './OrderItem';
import { Order as OrderType } from '@/interfaces/Order';

interface OrderProps extends OrderType {}

const Order: React.FC<OrderProps> = ({ creation_date, items }) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, pl: 4 , color:'#939393', fontWeight: 'semi-bold'}}>
        Pedido realizado: {new Date(creation_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <OrderItem image={item.product.image_urls[0]} title={item.product.name} description={item.product.type} price={item.product.price} key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default Order;
