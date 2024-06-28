'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	TextField,
} from '@mui/material';

/**
 * PasswordRecoveryForm component for password recovery.
 *
 * @returns {JSX.Element} The rendered PasswordRecoveryForm component.
 */
import { PasswordRecoverySchema } from '@/schemas';
import { useRecoverPasswordMutation } from '@/store';

export const PasswordRecoveryForm = () => {
	const [successfully, setSuccessfully] = useState('');
	const [errorMap, setErrorMap] = useState('');

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<z.infer<typeof PasswordRecoverySchema>>({
		resolver: zodResolver(PasswordRecoverySchema),
		defaultValues: {
			email: '',
		},
	});

	const [recoverPassword] = useRecoverPasswordMutation();

	/**
	 * Handles form submission for password recovery.
	 *
	 * @param {z.infer<typeof PasswordRecoverySchema>} data - The form data.
	 */
	async function onSubmit(data: z.infer<typeof PasswordRecoverySchema>) {
		try {
			await recoverPassword(data).unwrap();
			setErrorMap('');
			setSuccessfully('Solicitud de recuperación enviada');
		} catch (error: any) {
			setErrorMap('Ocurrió un error al enviar la solicitud');
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={{ xs: 2, md: 3 }}>
				<Grid item xs={12}>
					{errorMap && <Alert severity="error">{errorMap}</Alert>}
					{successfully && (
						<Alert severity="success">{successfully}</Alert>
					)}
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={!isDirty || isSubmitting}
						endIcon={isSubmitting && <CircularProgress size={20} />}
					>
						Enviar
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
