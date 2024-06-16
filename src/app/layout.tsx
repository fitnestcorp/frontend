import type { Metadata } from 'next';

import ThemeProviderWrapper from './ThemeProviderWrapper';
import ReduxProvider from './provider';

import './globals.css';

export const metadata: Metadata = {
	title: 'FITNEST',
	description: 'A fitness shop for all your needs',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
