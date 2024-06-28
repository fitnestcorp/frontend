'use client';
import { useState } from 'react';
import {
	Box,
	Button,
	TextField,
	Typography,
	Snackbar,
	Alert,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	Container,
	Grid,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { PQRSchema } from '@/schemas';
import { useSendPQRMutation } from '@/store';

/**
 * PQRForm component for handling Petitions, Complaints, and Claims (PQR) submission.
 *
 * @returns {JSX.Element} The rendered PQRForm component.
 */
export const PQRForm = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		'error' | 'success'
	>('success');
	const [sendPQR] = useSendPQRMutation();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<z.infer<typeof PQRSchema>>({
		resolver: zodResolver(PQRSchema),
		defaultValues: {
			name: '',
			email: '',
			type: 'Petición',
			description: '',
			privacyPolicy: false,
		},
	});

	/**
	 * Closes the snackbar notification.
	 */
	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	/**
	 * Handles form submission for PQR.
	 *
	 * @param {z.infer<typeof PQRSchema>} data - The form data.
	 */
	const onSubmit = async (data: z.infer<typeof PQRSchema>) => {
		try {
			await sendPQR(data).unwrap();

			setSnackbarMessage('PQR enviado exitosamente');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			reset();
		} catch (error) {
			setSnackbarMessage('Ocurrió un error al enviar el PQR');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	return (
		<Container
			maxWidth="md"
			sx={{
				my: 10,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Paper
				elevation={3}
				sx={{ p: 4, width: { xs: '100%', sm: '70%' } }}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography
								variant="h5"
								sx={{
									display: 'flex',
									justifyContent: 'center',
									fontWeight: 'bold',
								}}
							>
								Enviar PQR
							</Typography>
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
										size="small"
										error={!!errors.name}
										helperText={errors.name?.message}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: 'gray',
												},
												'&:hover fieldset': {
													borderColor: 'primary.main',
												},
											},
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Correo electrónico"
										variant="outlined"
										fullWidth
										size="small"
										error={!!errors.email}
										helperText={errors.email?.message}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: 'gray',
												},
												'&:hover fieldset': {
													borderColor: 'primary.main',
												},
											},
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl
								variant="outlined"
								fullWidth
								error={!!errors.type}
								sx={{
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderColor: 'gray',
										},
										'&:hover fieldset': {
											borderColor: 'primary.main',
										},
									},
								}}
							>
								<InputLabel id="type-label">
									Tipo de PQR
								</InputLabel>
								<Controller
									name="type"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											labelId="type-label"
											label="Tipo de PQR"
											size="small"
										>
											<MenuItem value="Petición">
												Petición
											</MenuItem>
											<MenuItem value="Queja">
												Queja
											</MenuItem>
											<MenuItem value="Reclamo">
												Reclamo
											</MenuItem>
										</Select>
									)}
								/>
								{errors.type && (
									<Typography
										variant="body2"
										color="error"
										sx={{ mt: 1 }}
									>
										{errors.type.message}
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Descripción"
										variant="outlined"
										fullWidth
										size="small"
										multiline
										rows={4}
										error={!!errors.description}
										helperText={errors.description?.message}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: 'gray',
												},
												'&:hover fieldset': {
													borderColor: 'primary.main',
												},
											},
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="privacyPolicy"
								control={control}
								render={({ field }) => (
									<FormControlLabel
										control={
											<Checkbox
												{...field}
												sx={{
													color: 'lightgray',
												}}
											/>
										}
										label="Acepto la política de privacidad"
									/>
								)}
							/>
							{errors.privacyPolicy && (
								<Typography
									variant="body2"
									color="error"
									sx={{ mt: 1 }}
								>
									{errors.privacyPolicy.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={!isDirty || isSubmitting}
								endIcon={
									isSubmitting && (
										<CircularProgress size={20} />
									)
								}
								sx={{
									fontSize: '1rem',
									textTransform: 'none',
								}}
							>
								Enviar
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>

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
		</Container>
	);
};
