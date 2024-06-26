import { Box, Container } from '@mui/material';

import { Footer, Navbar } from '@/components';

export const ShopLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: 'background.paper',
			}}
		>
			<Navbar />
			{children}
			<Footer />
		</Box>
	);
};

export default ShopLayout;
