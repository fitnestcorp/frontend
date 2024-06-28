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

interface Props {
	id: string;
	item: string;
	refetch: () => void;
	deleteMutation: any;
}

/**
 * DeleteButton component for deleting an item with a confirmation dialog and snackbar notifications.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the item to be deleted.
 * @param {string} props.item - The name of the item to be deleted.
 * @param {function} props.refetch - The function to refetch data after deletion.
 * @param {function} props.deleteMutation - The mutation function to delete the item.
 * @returns {JSX.Element} The DeleteButton component.
 */
export const DeleteButton = ({ id, item, refetch, deleteMutation }: Props) => {
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
		let errorOccurred = false;
		await deleteMutation(id)
			.unwrap()
			.catch((error: any) => {
				errorOccurred = true;
				setSnackbarSeverity('error');
				// setSnackbarMessage(`Ocurrió un error al eliminar ${item}`);
				setSnackbarMessage(error?.data?.message);
				setOpenSnackbar(true);
			});

		if (!errorOccurred) {
			setSnackbarSeverity('success');
			setSnackbarMessage(`${item} eliminado exitosamente`);
			setOpenSnackbar(true);
			handleClose();
			refetch();
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Tooltip title={`Eliminar`} arrow>
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
					Eliminar {item}
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
					¿Estás seguro que deseas eliminar {item}?
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
