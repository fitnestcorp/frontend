'use client';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { AddProductForm } from '../forms/AddProductForm';

export const AddProductModal = () => {
	const [open, setOpen] = useState(false);

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
				Crear Producto
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
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
					<AddProductForm />
				</DialogContent>
			</Dialog>
		</div>
	);
};
