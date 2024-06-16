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
	ShoppingCart as ShoppingCartIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
	PersonAdd as PersonAddIcon,
	FitnessCenter as FitnessCenterIcon,
	SportsEsports as SportsEsportsIcon,
	Build as BuildIcon,
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
					color: 'white',
					backgroundColor: 'black',
					'&:hover': {
						backgroundColor: 'white',
						color: 'black',
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
						width: { xs: '50%', sm: '40%', md: '30%' },
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
								color: 'text.secondary',
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
								color: 'text.secondary',
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
								color: 'text.secondary',
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
								color: 'text.secondary',
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
								color: 'text.secondary',
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
								color: 'text.secondary',
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

// 'use client';
// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import { LuUserPlus } from 'react-icons/lu';
// import {
// 	IoCartOutline,
// 	IoCloseOutline,
// 	IoLogInOutline,
// 	IoLogOutOutline,
// 	IoMenuOutline,
// } from 'react-icons/io5';

// import { Search } from '../ui/search/Search';

// export const Sidemenu = () => {
// 	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
// 	const drawerRef = useRef<HTMLDivElement>(null);

// 	const toggleDrawer = () => {
// 		setIsDrawerOpen(!isDrawerOpen);
// 	};

// 	const handleClickOutside = (event: MouseEvent) => {
// 		if (
// 			drawerRef.current &&
// 			!drawerRef.current.contains(event.target as Node)
// 		) {
// 			setIsDrawerOpen(false);
// 		}
// 	};

// 	useEffect(() => {
// 		if (isDrawerOpen) {
// 			document.addEventListener('mousedown', handleClickOutside);
// 		} else {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		}

// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, [isDrawerOpen]);

// 	return (
// 		<>
// 			<button
// 				className="m-2 p-2 rounded-md transition-all hover:bg-white hover:text-black"
// 				type="button"
// 				onClick={toggleDrawer}
// 				aria-controls="drawer-navigation"
// 			>
// 				<IoMenuOutline className="w-5 h-5" />
// 			</button>

// 			{isDrawerOpen && (
// 				<div
// 					className="fixed inset-0 z-30 bg-black opacity-50"
// 					onClick={toggleDrawer}
// 				></div>
// 			)}
// 			<div
// 				ref={drawerRef}
// 				id="drawer-navigation"
// 				className={`fixed top-0 right-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform ${
// 					isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
// 				} bg-white`}
// 				tabIndex={-1}
// 				aria-labelledby="drawer-navigation-label"
// 			>
// 				<h5
// 					id="drawer-navigation-label"
// 					className="text-base font-semibold text-gray-500 uppercase"
// 				>
// 					Menu
// 				</h5>
// 				<button
// 					type="button"
// 					onClick={toggleDrawer}
// 					aria-controls="drawer-navigation"
// 					className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
// 				>
// 					<IoCloseOutline className="w-5 h-5" />
// 					<span className="sr-only">Close menu</span>
// 				</button>
// 				<div className="py-4 overflow-y-auto">
// 					<Search className="block md:hidden border border-gray-400 rounded-lg mb-6 mt-2" />
// 					<ul className="space-y-2 font-medium mt-2 block sm:hidden">
// 						<li>
// 							<Link
// 								href="/categoria/entrenamiento"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Entrenamiento
// 								</span>
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/categoria/equipamiento"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Equipamiento
// 								</span>
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/categoria/servicios"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Servicios
// 								</span>
// 							</Link>
// 						</li>
// 					</ul>
// 					<ul className="space-y-2 font-medium pt-4 mt-4 border-t border-gray-300 sm:pt-0 sm:mt-0 sm:border-none">
// 						<li>
// 							<Link
// 								href="/carrito"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<IoCartOutline className="w-5 h-5" />
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Carrito
// 								</span>
// 								<span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-red-600 rounded-full">
// 									3
// 								</span>
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/iniciar-sesión"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<IoLogInOutline className="w-5 h-5" />
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Iniciar Sesión
// 								</span>
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/registrarse"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<LuUserPlus className="w-5 h-5" />
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Registrarse
// 								</span>
// 							</Link>
// 						</li>

// 						{/* Show when user is logged in */}
// 						<li>
// 							<Link
// 								href="/cerrar-sesión"
// 								className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
// 							>
// 								<IoLogOutOutline className="w-5 h-5" />
// 								<span className="flex-1 ms-3 whitespace-nowrap">
// 									Cerrar Sesión
// 								</span>
// 							</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</>
// 	);
// };
