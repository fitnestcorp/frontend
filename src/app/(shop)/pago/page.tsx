'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/logo.png'
import Image from 'next/image';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useHandlePayUResponseMutation } from '@/store/services/orderApi';

const PayUResponse = () => {
  const router = useRouter();
  const [handlePayUResponse] = useHandlePayUResponseMutation();

  useEffect(() => {
    const processPayUResponse = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());

      try {
        await handlePayUResponse(params).unwrap();
        router.push('/perfil');
      } catch (error) {
        console.error('Error al enviar la respuesta de PayU al backend:', error);
      }
    };

    processPayUResponse();
  }, [handlePayUResponse, router]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <Typography variant="h5" sx={{ mt: 2 }}>Procesando respuesta de PayU...</Typography>
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );
};

export default PayUResponse;
