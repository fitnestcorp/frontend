'use client';
import NextLink from 'next/link';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Link,
	Container,
	IconButton,
} from '@mui/material';

import { Cart, Search, Sidemenu } from '@/components';
import { PersonOutlineOutlined } from '@mui/icons-material';

export const Navbar = () => {
	return (
		<AppBar position="static" sx={{ backgroundColor: 'black' }}>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{ justifyContent: 'space-between' }}
				>
					{/* Logo */}
					<Link
						href="/"
						component={NextLink}
						sx={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							mr: 2,
						}}
					>
						<Typography
							variant="h4"
							sx={{ fontWeight: 'bold', color: 'white' }}
						>
							FITNEST
						</Typography>
					</Link>

					{/* Center Menu */}
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
							flexGrow: 1,
							justifyContent: 'center',
						}}
					>
						{/* <Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Box sx={{ display: { xs: 'none', sm: 'flex' } }}> */}
						<Button
							component={NextLink}
							href="/categoria/entrenamiento"
							sx={{
								color: 'white',
								mx: 1,
								borderRadius: '0.5rem',

								'&:hover': {
									backgroundColor: 'white',
									color: 'black',
								},
							}}
						>
							Entrenamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/equipamiento"
							sx={{
								color: 'white',
								mx: 1,
								borderRadius: '0.5rem',

								'&:hover': {
									backgroundColor: 'white',
									color: 'black',
								},
							}}
						>
							Equipamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/servicios"
							sx={{
								color: 'white',
								mx: 1,
								borderRadius: '0.5rem',

								'&:hover': {
									backgroundColor: 'white',
									color: 'black',
								},
							}}
						>
							Servicios
						</Button>
					</Box>
					{/* </Box> */}

					{/* Search, Cart, Login */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box sx={{ display: { xs: 'none', md: 'block' } }}>
							<Search />
						</Box>

						<Cart />

						<Box sx={{ display: { xs: 'none', md: 'block' } }}>
							<IconButton
								component={NextLink}
								href="/iniciar-sesion"
								color="inherit"
								sx={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '40px',
									height: '40px',
									borderRadius: '0.5rem',
									color: 'white',
									backgroundColor: 'black',
									'&:hover': {
										backgroundColor: 'white',
										color: 'black',
										border: '1px solid black',
									},
								}}
							>
								<PersonOutlineOutlined />
							</IconButton>
						</Box>
						{/* <Button
							component={NextLink}
							href="/iniciar-sesion"
							sx={{
								display: { xs: 'none', md: 'block' },
								color: 'white',
								mx: 1,
								borderRadius: '0.5rem',

								'&:hover': {
									backgroundColor: 'white',
									color: 'black',
								},
							}}
						>
							Iniciar sesión
						</Button> */}
						<Box sx={{ display: { xs: 'block', md: 'none' } }}>
							<Sidemenu />
						</Box>
					</Box>

					{/* Show when screen is small */}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
