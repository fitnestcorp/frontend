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
			<Container sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				{children}
			</Container>
			<Footer />
		</Box>
	);
};

export default ShopLayout;
