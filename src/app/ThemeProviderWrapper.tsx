'use client';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {theme} from './theme';

/**
 * ThemeProviderWrapper component that wraps the application with a custom Material-UI theme.
 * It provides a consistent theme and resets the CSS baseline for the entire application.
 * 
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the theme provider.
 * @returns {JSX.Element} The theme provider wrapper component.
 */
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default ThemeProviderWrapper;
