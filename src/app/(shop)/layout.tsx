import { Box, Container } from '@mui/material';

import { Footer, Navbar } from '@/components';

/**
 * ShopLayout component serves as the layout for the shop pages, including the Navbar at the top and the Footer at the bottom.
 * 
 * @component
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The layout component for the shop pages.
 */
const ShopLayout = ({
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
