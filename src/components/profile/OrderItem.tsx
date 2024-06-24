'use client'
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { downloadImage } from '../images/downloadImage';

interface OrderItemProps {
  image: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ image, title, description, quantity, price }) => {
  const [filePath, setFilePath] = useState<string>("");

  useEffect(() => {
    async function fetchImage() {
      const value = await downloadImage(image);
      if (value) {
        setFilePath(URL.createObjectURL(value));
      }
    }
    fetchImage();
  }, [image]);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, width: '45%', minWidth: '300px' }}>
      <Box component="img" sx={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '10px' }} src={filePath} alt={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 2, p: 0 }}>
        <Typography variant="h6" component="div">{title}</Typography>
        <Typography variant="body2" color="text.primary">{description}</Typography>
        <Typography variant="body2" color="text.primary">x {quantity}</Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', ml: 'auto' }}>
        <Typography variant="h6" component="div">${price.toLocaleString()}</Typography>
      </Box>
    </Card>
  );
};

export default OrderItem;
