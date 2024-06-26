'use client';
import { useState } from 'react';
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

import { useCreateGroupMutation } from '@/store';
import { AddGroupSchema } from '@/schemas';

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
}

export const AddGroupForm = ({ refetch }: Props) => {
	const [uploadedImage, setUploadedImage] = useState<string>('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success'
	>('success');

	const [createGroup] = useCreateGroupMutation();

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
		defaultValues: {
			name: '',
			description: '',
			url: '',
		},
	});

	async function onSubmit(data: z.infer<typeof AddGroupSchema>) {
		try {
			await createGroup(data);
			setSnackbarMessage('Grupo creado exitosamente');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			refetch();
		} catch (error) {
			setSnackbarMessage('Ocurrió un error al crear el grupo');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			const fileURL = URL.createObjectURL(file);
			setUploadedImage(fileURL);
			setValue('url', fileURL, {
				shouldValidate: true,
			});
		}
	};

	const handleDeleteImage = () => {
		setUploadedImage('');
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
											src={uploadedImage}
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
						Añadir grupo
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
