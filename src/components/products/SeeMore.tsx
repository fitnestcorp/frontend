import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const SeeMore: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pl:4,pr:4, pt:4  }}>
      <Typography variant="h4" sx={{ fontWeight: '700', }}>
        MÁS RELEVANTES
      </Typography>
      <Link href="/todos" passHref>
        <MuiLink underline="hover" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          VER TODOS
        </MuiLink>
      </Link>
    </Box>
  );
};

export default SeeMore;
