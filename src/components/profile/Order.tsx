import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import OrderItem from './OrderItem';
import { Address } from '@/interfaces/Address';

interface OrderProps {
  id: string;
  creation_date: Date;
  address: Address;
  total_price: number;
  items: { id: string; quantity: number; product: { image_urls: string[]; name: string; type: string; price: number, id: string }; }[];
}

const Order: React.FC<OrderProps> = ({ id, creation_date, address, total_price, items }) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Box key={id} sx={{ mb: 4, width: '100%', border: '1px solid #ddd', borderRadius: '8px', p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
        Orden #{id}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <span><strong>Fecha de creación:</strong> {formatDate(creation_date)}</span>
          <span><strong>Total de la compra:</strong> ${total_price.toLocaleString()}</span>
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <span><strong>Dirección:</strong> {`${address.address}`}</span>
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <OrderItem 
            image={item.product.image_urls[0]} 
            title={item.product.name} 
            description={item.product.type} 
            price={item.product.price} 
            quantity={item.quantity}  
            productId={item.product.id} 
            key={item.id} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default Order;
