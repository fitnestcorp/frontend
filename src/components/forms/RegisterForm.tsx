'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Grid,
	TextField,
	Button,
	Alert,
	CircularProgress,
	IconButton,
	InputAdornment,
	DialogActions,
} from '@mui/material';

import { RegisterSchema } from '@/schemas';
import { useRegisterUserMutation } from '@/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
	showRegisterButton?: boolean;
}

export const RegisterForm = ({ showRegisterButton = true }: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			birth_date: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const router = useRouter();

	const [successfully, setSuccessfully] = useState('');
	const [errorMap, setErrorMap] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const [registerUser, { data, error }] = useRegisterUserMutation();

	async function onSubmit(data: z.infer<typeof RegisterSchema>) {
		let errorocurred = false;
		const response = await registerUser(data)
			.unwrap()
			.catch((error) => {
				setErrorMap('Ocurrió un error al registrar el usuario');
				errorocurred = true;
			});
		if (!errorocurred && data) {
			setErrorMap('');
			setSuccessfully('Usuario registrado correctamente');
			router.push('/');
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={{ xs: 2, md: 3 }}>
				<Grid item xs={12}>
					<Controller
						name="first_name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Nombre"
								variant="outlined"
								fullWidth
								error={!!errors.first_name}
								helperText={errors.first_name?.message}
								sx={{
									'& label': {
										color: 'text.primary',
									},
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="last_name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Apellido"
								variant="outlined"
								fullWidth
								error={!!errors.last_name}
								helperText={errors.last_name?.message}
								sx={{
									'& label': {
										color: 'text.primary',
									},
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="birth_date"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Fecha de nacimiento"
								type="date"
								variant="outlined"
								fullWidth
								InputLabelProps={{ shrink: true }}
								error={!!errors.birth_date}
								helperText={errors.birth_date?.message}
								sx={{
									'& label': {
										color: 'text.primary',
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
								label="Email"
								type="email"
								variant="outlined"
								fullWidth
								error={!!errors.email}
								helperText={errors.email?.message}
								sx={{
									'& label': {
										color: 'text.primary',
									},
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Contraseña"
								type={passwordVisible ? 'text' : 'password'}
								variant="outlined"
								fullWidth
								error={!!errors.password}
								helperText={errors.password?.message}
								sx={{
									'& label': {
										color: 'text.primary',
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() =>
													setPasswordVisible(
														!passwordVisible
													)
												}
											>
												{passwordVisible ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Confirmar contraseña"
								type={
									confirmPasswordVisible ? 'text' : 'password'
								}
								variant="outlined"
								fullWidth
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword?.message}
								sx={{
									'& label': {
										color: 'text.primary',
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() =>
													setConfirmPasswordVisible(
														!confirmPasswordVisible
													)
												}
											>
												{confirmPasswordVisible ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* {successfully && (
							<Alert severity="success" sx={{ mb: 2 }}>
								{successfully}
							</Alert>
						)} */}
					{errorMap && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{errorMap}
						</Alert>
					)}
				</Grid>
				{showRegisterButton && (
					<Grid item xs={12}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={!isDirty || isSubmitting}
							endIcon={
								isSubmitting && <CircularProgress size={20} />
							}
						>
							Registrarse
						</Button>
					</Grid>
				)}

				{!showRegisterButton && (
					<Grid
						item
						xs={12}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							pb: 2,
						}}
					>
						<Button
							type="submit"
							variant="contained"
							disabled={!isDirty || isSubmitting}
							endIcon={
								isSubmitting && <CircularProgress size={20} />
							}
							sx={{ borderRadius: '0.5rem', width: '50%', py: 1 }}
						>
							Añadir Usuario
						</Button>
					</Grid>
				)}
			</Grid>
		</form>
	);
};
