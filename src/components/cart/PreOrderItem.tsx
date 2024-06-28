'use client'
import React from 'react';
import Link from 'next/link';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface ShoppingCartItemProps {
  image: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  productId: string;
}

/**
 * PreOrderItem component displays individual items in the pre-order summary.
 *
 * @component
 * @param {ShoppingCartItemProps} props - The properties object.
 * @param {string} props.image - The image URL of the product.
 * @param {string} props.title - The title of the product.
 * @param {string} props.description - The description of the product.
 * @param {number} props.quantity - The quantity of the product.
 * @param {number} props.price - The price of the product.
 * @param {string} props.productId - The unique identifier of the product.
 * @returns {JSX.Element} The PreOrderItem component.
 */
const PreOrderItem: React.FC<ShoppingCartItemProps> = ({ image, title, description, quantity, price, productId }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, width: '45%', minWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
      
      <Box component="img" sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '10px' }} src={image} alt={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 2, p: 0 }}>
        <Link href={`/producto/${productId}`} passHref>
          <Typography variant="h6" component="div" sx={{ color: '#282828', fontWeight: 'bold', textDecoration: 'none' }}>
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Typography>
        </Link>
        <Typography variant="body2" color="gray">{description}</Typography>
        <Typography variant="body2" color="gray">x {quantity}</Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', ml: 'auto' }}>
        <Typography component="div" sx={{ color: '#4C4C4C', fontWeight: 'bold' }}>${price.toLocaleString()}</Typography>
      </Box>
    </Card>
  );
};

export default PreOrderItem;
