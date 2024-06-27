'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
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
	Tooltip,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
	PersonAdd as PersonAddIcon,
	PersonOutlineOutlined,
} from '@mui/icons-material';

import { Search } from '@/components';
import { RootState, clearUser } from '@/store';

const groups = [
	{
		name: 'Cardio',
		href: '/grupo/cardio',
	},
	{
		name: 'Funcional',
		href: '/grupo/funcional',
	},
	{
		name: 'Fuerza',
		href: '/grupo/fuerza',
	},
	{
		name: 'Yoga',
		href: '/grupo/yoga',
	},
	{
		name: 'Boxeo',
		href: '/grupo/boxeo',
	},
];

const adminOptions = [
	{
		name: 'Gestionar usuarios',
		href: '/admin/getionar-usuarios',
	},
	{
		name: 'Gestionar productos',
		href: '/admin/gestionar-productos',
	},
	{
		name: 'Gestionar grupos',
		href: '/admin/gestionar-grupos',
	},
	{
		name: 'Gestionar categorias',
		href: '/admin/gestionar-categorias',
	},
];

export const Sidemenu = () => {
	const dispatch = useDispatch();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState('');
	const user = useSelector((state: RootState) => state.user.user);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleLogout = () => {
		setOpenSnackbar(true);
		setTimeout(() => {
			localStorage.removeItem('token');
			dispatch(clearUser());
		}, 1500);
	};

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
			<Tooltip title="Menú" arrow>
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
			</Tooltip>

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
						<Search onSearch={(value) => setSearchTerm(value)} />
					</Box>

					<Divider sx={{ mb: 1 }} />

					<List>
						<Typography variant="h6" color="gray" sx={{ mb: 2 }}>
							Grupos
						</Typography>
						{groups.map((group) => (
							<ListItem
								key={group.name}
								component={Link}
								href={group.href}
								sx={{
									color: 'text.primary',
									'&:hover': {
										color: 'grey',
									},
								}}
							>
								<ListItemText primary={group.name} />
							</ListItem>
						))}
					</List>

					{user?.role === 'ADMIN' && (
						<>
							<Divider sx={{ my: 1 }} />

							<List>
								<Typography
									variant="h6"
									color="gray"
									sx={{ mb: 2 }}
								>
									Admin
								</Typography>
								{adminOptions.map((option) => (
									<ListItem
										key={option.name}
										component={Link}
										href={option.href}
										sx={{
											color: 'text.primary',
											'&:hover': {
												color: 'grey',
											},
										}}
									>
										<ListItemText primary={option.name} />
									</ListItem>
								))}
							</List>
						</>
					)}

					<Divider sx={{ my: 1 }} />

					<List>
						{user ? (
							<>
								<ListItem
									component={Link}
									href="/perfil"
									sx={{
										color: 'text.primary',
										'&:hover': {
											color: 'grey',
										},
									}}
								>
									<ListItemIcon>
										<PersonOutlineOutlined />
									</ListItemIcon>
									<ListItemText primary="Perfil" />
								</ListItem>

								<ListItem
									component={Link}
									onClick={handleLogout}
									href="/"
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
							</>
						) : (
							<ListItem
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
						)}
					</List>
				</Box>
			</Drawer>

			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					severity="success"
					onClose={handleCloseSnackbar}
					sx={{ width: '100%' }}
					variant="filled"
				>
					Has cerrado sesión correctamente
				</Alert>
			</Snackbar>
		</>
	);
};
