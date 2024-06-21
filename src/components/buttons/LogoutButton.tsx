'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LogoutOutlined } from '@mui/icons-material';
import { Alert, IconButton, Snackbar, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

import { clearUser } from '@/store';

export const LogoutButton = () => {
	const dispatch = useDispatch();

	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleLogout = () => {
		setOpenSnackbar(true);
		setTimeout(() => {
			localStorage.removeItem('token');
			dispatch(clearUser());
		}, 6000);
		// localStorage.removeItem('token');
		// dispatch(clearUser());
	};

	return (
		<>
			<Tooltip title="Cerrar Sesión" arrow>
				<IconButton
					component={Link}
					onClick={handleLogout}
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
						color: 'text.secondary',
						backgroundColor: 'primary.main',
						'&:hover': {
							backgroundColor: 'secondary.main',
							color: 'text.primary',
							border: '1px solid black',
						},
					}}
				>
					<LogoutOutlined />
				</IconButton>
			</Tooltip>

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
