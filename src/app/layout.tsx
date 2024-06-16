import type { Metadata } from 'next';
import { inter } from '@/libs/fonts';
import './globals.css';
import ReduxProvider from './provider';

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
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
