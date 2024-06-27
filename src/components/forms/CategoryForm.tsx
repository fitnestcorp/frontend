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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { AddPhotoAlternateOutlined, DeleteOutline } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useGetAllGroupsQuery,
} from '@/store';
import { AddCategorySchema } from '@/schemas';
import { Category } from '@/interfaces';

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

interface Props {
	refetch: () => void;
	category?: Category;
}

export const CategoryForm = ({ refetch, category }: Props) => {
	const [uploadedImage, setUploadedImage] = useState<File | string | null>(
		null
	);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success'
	>('success');

	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();
	const { data: dataGroups } = useGetAllGroupsQuery({
		page: 1,
		limit: 10,
	});
	const groups = dataGroups?.[0] || [];

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof AddCategorySchema>>({
		resolver: zodResolver(AddCategorySchema),
		defaultValues: category
			? {
					name: category.name,
					description: category.description,
					url: category.image_url,
					groupName: category.group.name,
			  }
			: {
					name: '',
					description: '',
					url: '',
					groupName: '',
			  },
	});

	useEffect(() => {
		if (category) {
			setValue('name', category.name);
			setValue('description', category.description);
			setValue('url', category.image_url);
			setValue('groupName', category.group.name);
			setUploadedImage(category.image_url);
		}
	}, [category, setValue]);

	async function onSubmit(data: z.infer<typeof AddCategorySchema>) {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('groupName', data.groupName);

		if (typeof uploadedImage === 'string') {
			formData.append('existing_image', uploadedImage);
		} else if (uploadedImage) {
			formData.append('category_image', uploadedImage);
		}

		let errorOccurred = false;

		if (category) {
			await updateCategory({
				formData,
				id: category?.id,
			})
				.unwrap()
				.catch((error) => {
					setSnackbarMessage(
						'Ocurrió un error al actualizar la categoría'
					);
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
					errorOccurred = true;
				});

			if (!errorOccurred && data) {
				setSnackbarMessage('Categoría actualizada exitosamente');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
				refetch();
			}
		} else {
			await createCategory(formData)
				.unwrap()
				.catch((error) => {
					setSnackbarMessage(
						'Ocurrió un error al crear la categoría'
					);
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
					errorOccurred = true;
				});

			if (!errorOccurred && data) {
				setSnackbarMessage('Categoría creada exitosamente');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
				refetch();
			}
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setUploadedImage(file);
			const fileURL = URL.createObjectURL(file);
			setValue('url', fileURL, {
				shouldValidate: true,
			});
		}
	};

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
											alt="Category"
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
											textAlign: 'center',
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
					<Grid item xs={12}>
						<Controller
							name="groupName"
							control={control}
							render={({ field }) => (
								<FormControl
									fullWidth
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
								>
									<InputLabel id="group-select-label">
										Grupo
									</InputLabel>
									<Select
										{...field}
										labelId="group-select-label"
										label="Grupo"
										error={!!errors.groupName}
									>
										{groups?.length ?? 0 > 0 ? (
											groups?.map((group) => (
												<MenuItem
													key={group.name}
													value={group.name}
												>
													{group.name}
												</MenuItem>
											))
										) : (
											<MenuItem value="" disabled>
												No hay grupos
											</MenuItem>
										)}
									</Select>
									{errors.groupName && (
										<Box
											component="span"
											sx={{
												color: 'error.main',
												fontSize: '0.75rem',
												pt: 0.5,
												pl: 2,
											}}
										>
											{errors.groupName.message}
										</Box>
									)}
								</FormControl>
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
						{category ? 'Actualizar categoría' : 'Añadir categoría'}
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
