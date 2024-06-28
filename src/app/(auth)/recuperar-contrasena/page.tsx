import { Typography } from '@mui/material';

import { PasswordRecoveryForm } from '@/components';

/**
 * The PasswordRecoveryPage component renders a form for users to recover their passwords.
 * It displays a heading and a brief instruction, followed by the password recovery form.
 *
 * @page
 * @returns {JSX.Element} The rendered password recovery page.
 */

const PasswordRecoveryPage: React.FC = (): JSX.Element => {
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
