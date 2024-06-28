'use client';

import { useEffect } from 'react';
import ThemeProviderWrapper from './ThemeProviderWrapper';
import ReduxProvider from './provider';
import './globals.css';

/**
 * RootLayout component sets up the global layout for the application, including
 * the theme provider, Redux provider, and service worker registration.
 * 
 * @page
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/service-worker.js')
					.then((registration) => {
						console.log('Service Worker registered with scope:', registration.scope);
					}, (error) => {
						console.log('Service Worker registration failed:', error);
					});
			});
		}
	}, []);

	return (
		<html lang="en">
			<body>
				<ThemeProviderWrapper>
					<ReduxProvider>{children}</ReduxProvider>
				</ThemeProviderWrapper>
			</body>
		</html>
	);
}
