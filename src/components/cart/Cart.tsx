'use client';
import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
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
} from '@mui/material';
import {
	ShoppingCartOutlined as ShoppingCartIcon,
	Close as CloseIcon,
} from '@mui/icons-material';

import { CartItem } from './CartItem';

export const Cart = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const drawerRef = useRef<HTMLDivElement>(null);

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
							{[...Array(20)].map((_, index) => (
								<ListItem key={index}>
									<CartItem />
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
								$200.000
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
		</>
	);
};
