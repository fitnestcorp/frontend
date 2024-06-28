import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShoppingCart } from '@/interfaces/ShoppingCart';
import PreOrderItem from './PreOrderItem';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';


interface PreOrderProps {
  items: ShoppingCartItem[];
}

const PreOrder: React.FC<PreOrderProps> = ({ items }) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <PreOrderItem image={item.product.image_urls[0]} title={item.product.name} description={item.product.type} price={item.price} quantity={item.quantity} key={item.id} productId={item.product.id} />
        ))}
      </Box>
    </Box>
  );
};

export default PreOrder;
