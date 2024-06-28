import { Typography } from '@mui/material';

import { PasswordRecoveryForm } from '@/components';

const PasswordRecoveryPage = () => {
	return (
		<>
			<Typography
				component="h1"
				variant="h5"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}
			>
				Recuperar contraseña
			</Typography>
			<Typography
				component="p"
				variant="body1"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.primary', mb: 2 }}
			>
				Ingresa tu correo electrónico para recuperar tu contraseña
			</Typography>
			<PasswordRecoveryForm />
		</>
	);
};

export default PasswordRecoveryPage;
