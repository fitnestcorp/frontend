'use client';
import { useState } from 'react';
import { Close, DeleteOutline } from '@mui/icons-material';
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Snackbar,
	Tooltip,
} from '@mui/material';

import { useDeleteProductMutation } from '@/store';

interface Props {
	id: string;
}

export const DeleteProductButton = ({ id }: Props) => {
	const [deleteProduct] = useDeleteProductMutation();
	const [open, setOpen] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success'
	>('success');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		let erroroccurred = false;
		await deleteProduct(id)
			.unwrap()
			.catch((error) => {
				erroroccurred = true;
				setSnackbarSeverity('error');
				setSnackbarMessage('Ocurrió un error al eliminar el producto');
				setOpenSnackbar(true);
			});

		if (!erroroccurred) {
			setSnackbarSeverity('success');
			setSnackbarMessage('Producto eliminado exitosamente');
			setOpenSnackbar(true);
			handleClose();
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Tooltip title="Eliminar" arrow>
				<IconButton
					onClick={handleClickOpen}
					sx={{
						color: '#b71c1c',
					}}
				>
					<DeleteOutline />
				</IconButton>
			</Tooltip>

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
				<DialogTitle variant="h6" fontWeight={'bold'}>
					Eliminar Producto
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
					¿Estás seguro que deseas eliminar este producto?
				</DialogContent>
				<DialogActions
					sx={{
						padding: 2,
					}}
				>
					<Button
						onClick={handleClose}
						variant="outlined"
						color="primary"
					>
						Cancelar
					</Button>
					<Button
						onClick={handleDelete}
						variant="contained"
						color="error"
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
					variant="filled"
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};
