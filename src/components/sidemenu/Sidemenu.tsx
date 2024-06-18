'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Typography,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
	PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { Search } from '../ui/search/Search';

export const Sidemenu = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			drawerRef.current &&
			!drawerRef.current.contains(event.target as Node)
		) {
			setIsDrawerOpen(false);
		}
	};

	const drawerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isDrawerOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDrawerOpen]);

	return (
		<>
			<IconButton
				onClick={toggleDrawer}
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
					backgroundColor: 'black',
					'&:hover': {
						backgroundColor: 'secondary.main',
						color: 'text.primary',
						border: '1px solid black',
					},
				}}
			>
				<MenuIcon />
			</IconButton>

			<Drawer
				anchor="right"
				open={isDrawerOpen}
				onClose={toggleDrawer}
				sx={{
					'& .MuiDrawer-paper': {
						width: { xs: '60%', sm: '40%', md: '30%' },
						boxSizing: 'border-box',
					},
				}}
			>
				<Box
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						position: 'relative',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 2,
						}}
					>
						<Typography
							variant="h6"
							fontWeight="bold"
							color="primary"
						>
							MENÚ
						</Typography>
						<IconButton onClick={toggleDrawer}>
							<CloseIcon />
						</IconButton>
					</Box>
					<Divider sx={{ mb: 2 }} />

					<Box
						sx={{
							display: { xs: 'block', md: 'none' },
							borderRadius: '0.5rem',
							border: '1px solid #ccc',
							mb: 2,
						}}
					>
						<Search />
					</Box>

					<Divider sx={{ mb: 1 }} />

					<List>
						<Typography variant="h6" color="gray" sx={{ mb: 2 }}>
							Categorías
						</Typography>
						<ListItem
							button
							component={Link}
							href="/categoria/entrenamiento"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemText primary="Entrenamiento" />
						</ListItem>
						<ListItem
							button
							component={Link}
							href="/categoria/equipamiento"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemText primary="Equipamiento" />
						</ListItem>
						<ListItem
							button
							component={Link}
							href="/categoria/servicios"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemText primary="Servicios" />
						</ListItem>
					</List>

					<Divider sx={{ my: 1 }} />

					<List>
						<ListItem
							button
							component={Link}
							href="/iniciar-sesion"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary="Iniciar Sesión" />
						</ListItem>
						<ListItem
							button
							component={Link}
							href="/registrarse"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemIcon>
								<PersonAddIcon />
							</ListItemIcon>
							<ListItemText primary="Registrarse" />
						</ListItem>

						{/* Show when user is logged in */}
						<ListItem
							button
							component={Link}
							href="/cerrar-sesion"
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'grey',
								},
							}}
						>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Cerrar Sesión" />
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	);
};
