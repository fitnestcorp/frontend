import React from 'react';
import { Box, Typography } from '@mui/material';
import OrderItem from './OrderItem';

interface Product {
  image_urls: string[];
  name: string;
  type: string;
  price: number;
}

interface OrderItemProps {
  id: string;
  quantity: number;
  product: Product;
}

interface OrderProps {
  id: string;
  items: OrderItemProps[];
}


/**
 * Order component
 * Displays an order with its items.
 *
 * @param {OrderProps} props - The properties for the Order component.
 * @param {string} props.id - The ID of the order.
 * @param {OrderItemProps[]} props.items - The items in the order.
 * @returns {JSX.Element} The rendered Order component.
 */
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
