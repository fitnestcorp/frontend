import Image from 'next/image';
import { Box, Container, Typography, Paper } from '@mui/material';

export const AuthLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<Box sx={{ position: 'relative', minHeight: '100vh' }}>
			<Image
				src={'/background/pexels-goumbik-669578.jpg'}
				alt="background image"
				fill
				sizes="100vw"
				style={{
					objectFit: 'cover',
					zIndex: -1,
				}}
			/>
			<Container
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: { xs: 'center', md: 'flex-start' },
					minHeight: '100vh',
					pl: { xs: 2, sm: 3, md: 9 },
					pr: { xs: 2, sm: 3, md: 9 },
				}}
			>
				<Paper
					elevation={3}
					sx={{
						width: '100%',
						maxWidth: '500px',
						p: { xs: 3, sm: 6 },
						mx: { xs: 2, sm: 'auto' },
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						borderRadius: 8,
						backdropFilter: 'blur(5px)',
					}}
				>
					<a href="/">
					<Typography
						variant="h1"
						component="h1"
						sx={{
							mb: 4,
							fontSize: { xs: '2.5rem', sm: '3rem' },
							fontWeight: 'bold',
							textAlign: 'center',
							color: 'text.primary',
						}}
					>
						FITNEST
					</Typography>
					</a>
					{children}
				</Paper>
			</Container>
		</Box>
	);
};

export default AuthLayout;
