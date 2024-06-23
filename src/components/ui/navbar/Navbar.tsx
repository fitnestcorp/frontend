'use client';
import { useState } from 'react';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Link,
	Container,
	IconButton,
	Tooltip,
} from '@mui/material';
import { PersonOutlineOutlined } from '@mui/icons-material';

import {
	AdminButton,
	Cart,
	LogoutButton,
	Search,
	Sidemenu,
} from '@/components';
import { RootState } from '@/store';

export const Navbar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const user = useSelector((state: RootState) => state.user.user);

	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: 'primary.main',
			}}
		>
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
							sx={{ fontWeight: 'bold', color: 'text.secondary' }}
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
								color: 'text.secondary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.primary',
								},
							}}
						>
							Entrenamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/equipamiento"
							sx={{
								color: 'text.secondary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.primary',
								},
							}}
						>
							Equipamiento
						</Button>
						<Button
							component={NextLink}
							href="/categoria/servicios"
							sx={{
								color: 'text.secondary',
								mx: 1,
								borderRadius: '0.5rem',
								'&:hover': {
									backgroundColor: 'secondary.main',
									color: 'text.primary',
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
							<Search
								onSearch={(value) => setSearchTerm(value)}
							/>
						</Box>

						{/* Shopping Cart */}
						<Cart />

						<Box sx={{ display: { xs: 'none', md: 'block' } }}>
							<Box sx={{ display: 'flex', gap: 2 }}>
								{/* Show if user is admin */}
								{user?.role === 'ADMIN' && (
									<Box
										sx={{
											display: {
												xs: 'none',
												md: 'block',
											},
										}}
									>
										<AdminButton />
									</Box>
								)}

								{/* Show if user is not authenticated */}
								{user ? (
									
									<><Tooltip title="Perfil" arrow>
										<IconButton
											component={NextLink}
											href="/perfil"
											color="inherit"
											sx={{
												position: 'relative',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: '40px',
												height: '40px',
												borderRadius: '0.5rem',
												color: 'text.secondary',
												backgroundColor: 'primary.main',
												'&:hover': {
													backgroundColor: 'secondary.main',
													color: 'text.primary',
													border: '1px solid black',
												},
											}}
										>
											<PersonOutlineOutlined />
										</IconButton>
									</Tooltip>
									<LogoutButton />
									</>
									
								) : (
									<Tooltip title="Iniciar Sesión" arrow>
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
												color: 'text.secondary',
												backgroundColor: 'primary.main',
												'&:hover': {
													backgroundColor:
														'secondary.main',
													color: 'text.primary',
													border: '1px solid black',
												},
											}}
										>
											<PersonOutlineOutlined />
										</IconButton>
									</Tooltip>
								)}
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
