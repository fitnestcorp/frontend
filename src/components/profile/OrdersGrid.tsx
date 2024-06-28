// components/profile/OrdersGrid.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Order from './Order';
import { Order as OrderType } from '@/interfaces/Order';

const orders: OrderType[] = [
  {
    id: '1',
    total_price: 700000,
    status: { id: '1', name: 'Enviado' },
    creation_date: new Date('2024-06-15'),
    shipment_date: new Date('2024-06-16'),
    received_date: new Date('2024-06-17'),
    items: [
      {
        id: '1',
        quantity: 3,
        product: {
          id: '1',
          name: 'Set de Mancuernas',
          description: 'dasdasdasdasdas',
          price: 600000,
          creation_date: "10-10-2024",
          status: "Activo",
          rate: 4.5,
          reviews: [],
          image_urls: ['812w7U9WzwL._AC_SX679_.jpg'],
          stock: {
            id: "123",
            stock: 20,
            unities_sold: 10,
          },
          type: 'Juego de 130 lb',
          category: {
            id: '123',
            name: 'Mancuernas',
            description: 'Palos de metal',
            image_url: '51FKyNvkUzL._AC_SX679_.jpg',
            group: {
              id: '1', name: 'Grupo 1',
              description: '',
              image_url: '',
              categories: []
            },
            products: []
          },
        },
      },
      {
        id: '1',
        quantity: 3,
        product: {
          id: '1',
          name: 'Set de Mancuernas',
          description: 'dasdasdasdasdas',
          price: 600000,
          creation_date: "10-10-2024",
          status: "Activo",
          rate: 4.5,
          reviews: [],
          image_urls: ['812w7U9WzwL._AC_SX679_.jpg'],
          stock: {
            id: "123",
            stock: 20,
            unities_sold: 10,
          },
          type: 'Juego de 130 lb',
          category: {
            id:'123',
            name: 'Mancuernas',
            description: 'Palos de metal',
            image_url: '51FKyNvkUzL._AC_SX679_.jpg',
            group: {
              id: '1', name: 'Grupo 1',
              description: '',
              image_url: '',
              categories: []
            },
            products: [],
          },
        },
      },
    ],
    user: { id: '1', email: 'user@example.com', first_name: 'John', last_name: 'Doe', birth_date: '1990-01-01', role: 'User' },
    address: {
      id: '1',
      address: 'Calle 123',
      phone_number: '123456789',
      zip_code: '12345',
      city: { name: 'Ciudad', department: { name: 'Estado' } },
    },
    payment_method: { id: '1', name: 'Tarjeta de crédito' },
  },
];

const OrdersGrid: React.FC = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold',  }}>
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
