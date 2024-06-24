import React from 'react';
import Image from 'next/image';
import logo from '../../../public/Logo/Logo.png';
import { Box } from '@mui/material';

const LogoLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)', // Optional: Adds a semi-transparent background
        zIndex: 9999, // Ensure it appears on top of everything
      }}
    >
      <Image
        src={logo}
        width={200}
        height={200}
        alt='Digital Leaf'
        className='animate-pulse'
      />
    </Box>
  );
};

export default LogoLoader;
