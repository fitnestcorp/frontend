'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
	Button,
	DialogActions,
	TextField,
	IconButton,
	Box,
	Grid,
	styled,
	Card,
	Tooltip,
	CircularProgress,
	Typography,
	Snackbar,
	Alert,
} from '@mui/material';
import { AddPhotoAlternateOutlined, DeleteOutline } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useCreateGroupMutation, useUpdateGroupMutation } from '@/store';
import { AddGroupSchema } from '@/schemas';
import { Group } from '@/interfaces';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

/**
 * Props for the GroupForm component.
 *
 * @typedef {Object} Props
 * @property {Function} refetch - Function to refetch data.
 * @property {Group} [group] - The group to be edited, if any.
 */
interface Props {
	refetch: () => void;
	group?: Group;
}

/**
 * GroupForm component for creating or updating a group.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered GroupForm component.
 */
export const GroupForm = ({ refetch, group }: Props) => {
	const [uploadedImage, setUploadedImage] = useState<File | string | null>(
		null
	);
	const [imageError, setImageError] = useState<string | null>(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success'
	>('success');

	const [createGroup] = useCreateGroupMutation();
	const [updateGroup] = useUpdateGroupMutation();

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof AddGroupSchema>>({
		resolver: zodResolver(AddGroupSchema),
		defaultValues: group
			? {
					name: group.name,
					description: group.description,
					url: group.image_url,
			  }
			: {
					name: '',
					description: '',
					url: '',
			  },
	});

	useEffect(() => {
		if (group) {
			setValue('name', group.name);
			setValue('description', group.description);
			setValue('url', group.image_url);
			setUploadedImage(group.image_url);
		}
	}, [group, setValue]);

	/**
	 * Handles form submission for creating or updating a group.
	 *
	 * @param {z.infer<typeof AddGroupSchema>} data - The form data.
	 */
	async function onSubmit(data: z.infer<typeof AddGroupSchema>) {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('description', data.description);

		if (typeof uploadedImage === 'string') {
			formData.append('existing_image', uploadedImage);
		} else if (uploadedImage) {
			formData.append('group_image', uploadedImage);
		}

		let errorOccurred = false;

		if (group) {
			await updateGroup({
				formData,
				id: group?.id,
			})
				.unwrap()
				.catch((error) => {
					setSnackbarMessage(
						'Ocurrió un error al actualizar el grupo'
					);
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
					errorOccurred = true;
				});

			if (!errorOccurred && data) {
				setSnackbarMessage('Grupo actualizado exitosamente');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
				refetch();
			}
		} else {
			await createGroup(formData)
				.unwrap()
				.catch((error) => {
					setSnackbarMessage('Ocurrió un error al crear el grupo');
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
					errorOccurred = true;
				});

			if (!errorOccurred && data) {
				setSnackbarMessage('Grupo creado exitosamente');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
				refetch();
			}
		}
	}

	/**
	 * Handles image change event.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
	 */
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setUploadedImage(file);
			const fileURL = URL.createObjectURL(file);
			setValue('url', fileURL, { shouldValidate: true });
		}
	};

	/**
	 * Handles image deletion.
	 */
	const handleDeleteImage = () => {
		setUploadedImage(null);
		setValue('url', '', { shouldValidate: true });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4} px={4} py={2}>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Card sx={{ borderRadius: '8px' }}>
									{uploadedImage ? (
										<Image
											src={
												typeof uploadedImage ===
												'string'
													? uploadedImage
													: URL.createObjectURL(
															uploadedImage
													  )
											}
											alt="Group"
											width={400}
											height={200}
											style={{
												borderRadius: '8px',
												width: 'auto',
												height: 'auto',
											}}
										/>
									) : (
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												width: { xs: 200, sm: 400 },
												height: { xs: 150, sm: 200 },
												borderRadius: '8px',
												backgroundColor: 'grey.200',
											}}
										>
											<AddPhotoAlternateOutlined
												sx={{
													fontSize: 40,
													color: 'grey.500',
												}}
											/>
										</Box>
									)}
								</Card>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Tooltip title="Eliminar imagen" arrow>
									<IconButton
										onClick={handleDeleteImage}
										sx={{ color: '#b71c1c' }}
									>
										<DeleteOutline />
									</IconButton>
								</Tooltip>

								<Button
									component="label"
									role={undefined}
									variant="contained"
									size="small"
									tabIndex={-1}
									startIcon={<AddPhotoAlternateOutlined />}
									sx={{
										border: '1px solid gray',
										borderRadius: '0.5rem',
										fontSize: '0.8rem',
										backgroundColor: 'secondary.main',
										color: 'primary.main',
										textTransform: 'none',
										mx: { xs: 1, sm: 2 },
										'&:hover': {
											color: 'secondary.main',
										},
									}}
								>
									Añadir imagen
									<VisuallyHiddenInput
										type="file"
										accept="image/*"
										onChange={handleImageChange}
									/>
								</Button>
							</Grid>
							<Grid item xs={12}>
								{errors.url && (
									<Typography
										sx={{
											display: 'flex',
											justifyContent: 'center',
											color: 'error.main',
											fontSize: '0.75rem',
											pt: 0.5,
											pl: 2,
										}}
									>
										{errors.url.message}
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Nombre"
									variant="outlined"
									fullWidth
									error={!!errors.name}
									helperText={errors.name?.message}
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									error={!!errors.description}
									helperText={errors.description?.message}
									label="Descripción"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									sx={{
										'& label': {
											color: 'text.primary',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'gray',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<DialogActions
					sx={{
						display: 'flex',
						justifyContent: 'center',
						pr: 4,
						py: 2,
					}}
				>
					<Button
						type="submit"
						variant="contained"
						sx={{
							borderRadius: '0.5rem',
							width: '50%',
							py: 1,
						}}
						disabled={isSubmitting || !isDirty}
						endIcon={isSubmitting && <CircularProgress size={20} />}
					>
						{group ? 'Actualizar grupo' : 'Añadir grupo'}
					</Button>
				</DialogActions>
			</form>

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
		</div>
	);
};
