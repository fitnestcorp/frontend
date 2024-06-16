'use client';
import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Grid,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	CircularProgress,
	InputAdornment,
	IconButton,
	Link,
} from '@mui/material';

import { LoginSchema } from '@/schemas';
import { useLoginUserMutation } from '@/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const router = useRouter();

	const [successfully, setSuccessfully] = useState('');
	const [errorMap, setErrorMap] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);

	const [loginUser, { data, error }] = useLoginUserMutation();

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		let errorocurred = false;
		await loginUser(data)
			.unwrap()
			.catch((error) => {
				setErrorMap('Ocurrió un error al iniciar sesión');
				errorocurred = true;
			});

		if (!errorocurred && data) {
			setErrorMap('');
			setSuccessfully('Sesión iniciada correctamente');
			router.push('/');
		}
	}
	return (
		<Box>
			<Typography
				component="h1"
				variant="h5"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 2 }}
			>
				Iniciar Sesión
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Email"
									variant="outlined"
									fullWidth
									error={!!errors.email}
									helperText={errors.email?.message}
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
					<Grid item xs={12} sx={{ textAlign: 'left' }}>
						<Link
							href="/forgot-password"
							style={{
								color: '#377AB8',
								fontWeight: 'bold',
								textDecoration: 'none',
								fontSize: '0.875rem',
							}}
						>
							¿Olvidaste la contraseña?
						</Link>
					</Grid>
					<Grid item xs={12}>
						{successfully && (
							<Alert severity="success">{successfully}</Alert>
						)}
						{errorMap && <Alert severity="error">{errorMap}</Alert>}
					</Grid>
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
							Iniciar Sesión
						</Button>
					</Grid>
				</Grid>
			</form>
			<Typography
				variant="body2"
				textAlign="center"
				mt={2}
				sx={{ color: 'text.secondary' }}
			>
				¿Aún no tienes cuenta?{' '}
				<Link
					href="/registrarse"
					component={NextLink}
					style={{
						color: '#377AB8',
						textDecoration: 'none',
						fontWeight: 'bold',
					}}
				>
					Crear cuenta
				</Link>
			</Typography>
		</Box>
	);
};
