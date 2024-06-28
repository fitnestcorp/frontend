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
import { ExpandMore, PersonOutlineOutlined } from '@mui/icons-material';

import {
	AdminButton,
	Cart,
	LogoutButton,
	MenuNavbar,
	Search,
	Sidemenu,
} from '@/components';
import { RootState } from '@/store';

export const Navbar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const user = useSelector((state: RootState) => state.user.user);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
							onClick={handleClick}
							endIcon={<ExpandMore />}
							sx={{ color: 'white', mx: 2 }}
						>
							Entrenamiento
						</Button>
						<MenuNavbar
							anchorEl={anchorEl}
							handleClose={handleClose}
						/>
						{user ? (
						<Button
							component={NextLink}
							href="/ordenes"
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
							Ordenes
						</Button>
						):(<></>)}
					</Box>

					{/* Search, Cart, Login */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box sx={{ display: { xs: 'none', md: 'block' } }}>
							<Search
								onSearch={(value) => setSearchTerm(value)}
							/>
						</Box>

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

								{user ? (
									<>
										<Cart />
										<Tooltip title="Perfil" arrow>
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
													backgroundColor:
														'primary.main',
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
							sx={{ display: { xs: 'flex', md: 'none' }, gap: 2 }}
						>
							<Cart />
							<Sidemenu />
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
