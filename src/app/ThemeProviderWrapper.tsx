'use client';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {theme} from './theme';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default ThemeProviderWrapper;
