'use client';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Box,
	useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { RegisterForm } from '../forms/RegisterForm';

interface Props {
	refetch: () => void;
}

export const AddUserModal = ({ refetch }: Props) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				onClick={handleClickOpen}
				variant="contained"
				sx={{
					borderRadius: '0.5rem',
				}}
			>
				Añadir Usuario
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
				sx={{
					'& .MuiDialog-paper': {
						borderRadius: '0.5rem',
					},
				}}
			>
				<DialogTitle>
					<IconButton
						onClick={handleClose}
						sx={{
							position: 'absolute',
							top: 10,
							right: 10,
							color: 'gray',
						}}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							px: 4,
							pt: 2,
						}}
					>
						<RegisterForm refetch={refetch} showRegisterButton={false} />
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};
