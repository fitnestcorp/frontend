import React from 'react';
import { Box, Typography } from '@mui/material';
import OrderItem from './OrderItem'; // Asegúrate de importar correctamente OrderItem

interface OrderProps {
  id: string;
  items: { id: string; quantity: number; product: { image_urls: string[]; name: string; type: string; price: number }; }[];
}

const Order: React.FC<OrderProps> = ({ id, items }) => {
  console.log("ayuda", items)
  return (
    <Box key={id} sx={{ mb: 4, width: '100%' }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Orden #{id}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <OrderItem 
            image={item.product.image_urls[0]} 
            title={item.product.name} 
            description={item.product.type} 
            price={item.product.price} 
            quantity={item.quantity}  
            key={item.id} 
             
          />
        ))}
      </Box>
    </Box>
  );
};

export default Order;
