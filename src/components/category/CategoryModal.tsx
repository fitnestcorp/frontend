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

import { CategoryForm } from '@/components';
import { useGetCategoryByIdQuery } from '@/store';

interface Props {
	refetch: () => void;
	categoryId?: string;
}

/**
 * CategoryModal component for creating or editing a category.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.refetch - Function to refetch the categories list after creating or editing a category.
 * @param {string} [props.categoryId] - The ID of the category to edit. If not provided, the modal will be used to create a new category.
 * @returns {JSX.Element} The rendered CategoryModal component.
 */
export const CategoryModal = ({ refetch, categoryId }: Props) => {
	const [open, setOpen] = useState(false);

	const { data: category } = useGetCategoryByIdQuery(categoryId ?? '');

	/**
	 * Opens the modal.
	 */
	const handleClickOpen = () => {
		setOpen(true);
	};

	/**
	 * Closes the modal.
	 */
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{categoryId ? (
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
					Crear Categoría
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
					{category ? (
						<CategoryForm refetch={refetch} category={category} />
					) : (
						<CategoryForm refetch={refetch} />
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
