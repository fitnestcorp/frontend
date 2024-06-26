'use client';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Drawer,
	IconButton,
	Badge,
	Box,
	Typography,
	Button,
	List,
	ListItem,
	Divider,
	Tooltip,
	Modal,
} from '@mui/material';
import {
	ShoppingCartOutlined as ShoppingCartIcon,
	Close as CloseIcon,
} from '@mui/icons-material';

import { RootState, useGetShoppingCartByUserIdQuery } from '@/store';
import { clearUser } from '@/store/slices/userSlice'; // Importa la acción de clearUser
import { CartItem } from '@/components';

export const Cart = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [isInvalidUserModalOpen, setIsInvalidUserModalOpen] = useState<boolean>(false);
	const drawerRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.user);
	const { data: dataCart } = useGetShoppingCartByUserIdQuery(user?.id || '', {
		skip: !user,
	});
	const cart = dataCart;

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

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.classList.add('overflow-hidden');
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDrawerOpen]);

	useEffect(() => {
		if (isDrawerOpen && !cart) {
			setIsInvalidUserModalOpen(true);
			toggleDrawer();
		}
	}, [isDrawerOpen, cart]);

	const handleModalClose = () => {
		setIsInvalidUserModalOpen(false);
		dispatch(clearUser());
	};

	return (
		<>
			<Tooltip title="Carrito" arrow>
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
					<Badge badgeContent={3} color="error">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</Tooltip>

			<Drawer
				anchor="right"
				open={isDrawerOpen}
				onClose={toggleDrawer}
				sx={{
					'& .MuiDrawer-paper': {
						width: { xs: '100%', sm: '50%', md: '40%', lg: '30%' },
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
							color="text.primary"
						>
							CARRITO
						</Typography>
						<IconButton onClick={toggleDrawer}>
							<CloseIcon />
						</IconButton>
					</Box>
					<Divider sx={{ mb: 1 }} />

					<Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
						<List>
							{cart?.items.map((item) => (
								<ListItem key={item.id}>
									<CartItem cartItem={item} />
								</ListItem>
							))}
						</List>
					</Box>

					<Divider sx={{ mt: 1 }} />

					<Box sx={{ p: 2 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								mb: 2,
							}}
						>
							<Typography
								variant="h5"
								fontWeight="bold"
								color="text.primary"
							>
								Subtotal:
							</Typography>
							<Typography
								variant="h5"
								fontWeight="bold"
								color="text.primary"
							>
								${cart?.sub_total}
							</Typography>
						</Box>
						<Button
							variant="contained"
							fullWidth
							sx={{
								backgroundColor: 'black',
								color: 'text.secondary',
								borderRadius: '0.5rem',
								paddingY: '0.5rem',
								'&:hover': { backgroundColor: '#333' },
							}}
							component={NextLink}
							href="#"
						>
							Comprar
						</Button>
					</Box>
				</Box>
			</Drawer>

			<Modal
				open={isInvalidUserModalOpen}
				onClose={handleModalClose}
				aria-labelledby="invalid-user-modal-title"
				aria-describedby="invalid-user-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id="invalid-user-modal-title" variant="h6" component="h2">
						Usuario inválido
					</Typography>
					<Typography id="invalid-user-modal-description" sx={{ mt: 2 }}>
						Tu sesión ha expirado o el usuario no es válido. Por favor, inicia sesión nuevamente.
					</Typography>
					<Button onClick={handleModalClose}>Cerrar</Button>
				</Box>
			</Modal>
		</> 
	);
};
