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
import {
	LogoutOutlined,
	PersonOutlineOutlined,
	TuneOutlined,
} from '@mui/icons-material';

import { AdminButton, Cart, Search, Sidemenu } from '@/components';

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
							sx={{ fontWeight: 'bold', color: 'text.primary' }}
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
						<Button
							component={NextLink}
							href="/categoria/entrenamiento"
							sx={{
								color: 'text.primary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.secondary',
								},
							}}
						>
							Entrenamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/equipamiento"
							sx={{
								color: 'text.primary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.secondary',
								},
							}}
						>
							Equipamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/servicios"
							sx={{
								color: 'text.primary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.secondary',
								},
							}}
						>
							Servicios
						</Button>
					</Box>

					{/* Search, Cart, Login */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box
							sx={{
								display: { xs: 'none', md: 'block' },
							}}
						>
							<Search />
						</Box>
						<Cart />
						<Box sx={{ display: { xs: 'none', md: 'block' } }}>
							<Box sx={{ display: 'flex', gap: 2 }}>
								{/* Show if user is not authenticated */}
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
										color: 'text.primary',
										backgroundColor: 'black',
										'&:hover': {
											backgroundColor: 'secondary.main',
											color: 'text.secondary',
											border: '1px solid black',
										},
									}}
								>
									<PersonOutlineOutlined />
								</IconButton>

								{/* Show if user is admin */}
								<Box
									sx={{
										display: { xs: 'none', md: 'block' },
									}}
								>
									<AdminButton />
								</Box>

								{/* Show if user is autehnticated */}
								<IconButton
									component={NextLink}
									onClick={() => {}}
									href="/"
									color="inherit"
									sx={{
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '40px',
										height: '40px',
										borderRadius: '0.5rem',
										color: 'text.primary',
										backgroundColor: 'black',
										'&:hover': {
											backgroundColor: 'secondary.main',
											color: 'text.secondary',
											border: '1px solid black',
										},
									}}
								>
									<LogoutOutlined />
								</IconButton>
							</Box>
						</Box>

						{/* Show when screen is small */}
						<Box
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<Sidemenu />
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
