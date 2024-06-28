'use client';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { Close, EditOutlined } from '@mui/icons-material';

import { ProductForm } from '@/components';
import { useGetProductByIdQuery } from '@/store';

interface Props {
	/**
	 * Function to refetch data after product creation or update.
	 */
	refetch: () => void;
	/**
	 * Optional ID of the product to be edited.
	 */
	productId?: string;
}

/**
 * ProductModal component.
 * Displays a modal dialog for creating or editing a product.
 *
 * @param {Props} props - The properties for the component.
 * @returns {JSX.Element} The ProductModal component.
 */
export const ProductModal = ({ refetch, productId }: Props) => {
	const [open, setOpen] = useState(false);

	const { data: product } = useGetProductByIdQuery(productId ?? '');

	/**
	 * Handles opening the modal dialog.
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};

	/**
	 * Handles closing the modal dialog.
	 */
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{productId ? (
				<Tooltip title="Editar" arrow>
					<IconButton
						onClick={handleClickOpen}
						sx={{
							color: '#1565c0',
						}}
					>
						<EditOutlined />
					</IconButton>
				</Tooltip>
			) : (
				<Button
					onClick={handleClickOpen}
					variant="contained"
					sx={{
						borderRadius: '0.5rem',
					}}
				>
					Crear Producto
				</Button>
			)}

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
					{product ? (
						<ProductForm refetch={refetch} product={product} />
					) : (
						<ProductForm refetch={refetch} />
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
