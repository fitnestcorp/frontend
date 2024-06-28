'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useHandlePayUResponseMutation } from '@/store/services/orderApi';
import { useDeleteShoppingCartMutation } from '@/store';
import logo from '../../../../public/Logo/Logo.png';

/**
 * PayUResponse page handles the PayU response by sending the received parameters to the backend
 * and then redirects the user to the profile page.
 *
 * @page
 * @example
 * return (
 *   <PayUResponse />
 * )
 */
const PayUResponse = () => {
  const router = useRouter();
  const [handlePayUResponse] = useHandlePayUResponseMutation();
  const [deleteShoppingCart] = useDeleteShoppingCartMutation();

  useEffect(() => {
    /**
     * Processes the PayU response by extracting query parameters,
     * sending them to the backend, and handling the response.
     */
    const processPayUResponse = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());
      const userId = params.userId; // Asegúrate de que el userId esté presente en los parámetros

      try {
        await handlePayUResponse(params).unwrap();
        await deleteShoppingCart(userId).unwrap();
        router.push('/perfil');
      } catch (error) {
        console.error('Error al enviar la respuesta de PayU al backend:', error);
      }
    };

    processPayUResponse();
  }, [handlePayUResponse, deleteShoppingCart, router]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <Typography variant="h5" sx={{ mt: 2 }}>Procesando respuesta de PayU...</Typography>
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );
};

export default PayUResponse;
