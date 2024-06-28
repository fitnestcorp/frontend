'use client';
import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Grid,
	TextField,
	Button,
	Alert,
	CircularProgress,
	InputAdornment,
	IconButton,
	Link,
	Typography,
	Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginSchema } from '@/schemas';
import { setUser, useLoginUserMutation } from '@/store';

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

	const [loginUser] = useLoginUserMutation();
	const dispatch = useDispatch();

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		try {
			const response = await loginUser(data).unwrap();
			dispatch(setUser({ user: response.user }));
			setErrorMap('');
			setSuccessfully('Sesión iniciada correctamente');
			router.push('/');
		} catch (error: any) {
			if (error?.status === 401) {
				setErrorMap('Email o contraseña incorrectos');
			} else {
				setErrorMap('Ocurrió un error al iniciar sesión');
			}
		}
	}

	async function onSubmitGoogleAuth(event: any) {
		try {
			event.preventDefault();
			if (typeof window !== 'undefined') {
				window.location.href = `http://localhost:3000/auth/google/login`;
			}
		} catch (error: any) {
			if (error?.status === 401) {
				setErrorMap('Email o contraseña incorrectos');
			} else {
				setErrorMap('Ocurrió un error al iniciar sesión');
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={{ xs: 2, md: 3 }}>
				<Grid item xs={12}>
					{errorMap && <Alert severity="error">{errorMap}</Alert>}
				</Grid>
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
				<Grid item xs={12} sx={{ textAlign: 'left' }}>
					<Link
						href="/recuperar-contrasena"
						component={NextLink}
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={!isDirty || isSubmitting}
						endIcon={isSubmitting && <CircularProgress size={20} />}
					>
						Iniciar Sesión
					</Button>
				</Grid>

				<Grid item xs={12}>
					<Divider sx={{ mb: 3 }}>O</Divider>

					<Button
						// type="submit"
						fullWidth
						variant="contained"
						sx={{
							marginBottom: '1rem',
						}}
						onClick={onSubmitGoogleAuth}
						//disabled={!isDirty || isSubmitting}
						//endIcon={isSubmitting && <CircularProgress size={20} />}
					>
						Conectarse con Google{' '}
						<GoogleIcon sx={{ marginLeft: '0.5rem' }} />
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
