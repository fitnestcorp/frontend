import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';

import { RegisterForm } from '@/components';

/**
 * The RegisterPage component renders a registration form for new users.
 * It displays a heading and a prompt to log in if the user already has an account.
 *
 * @page
 * @returns {JSX.Element} The rendered registration page.
 */
const RegisterPage = () => {
	return (
		<>
			<Typography
				component="h1"
				variant="h5"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}
			>
				Registrarse
			</Typography>
			<RegisterForm />
			<Typography
				variant="body2"
				textAlign="center"
				mt={2}
				sx={{ color: 'text.primary' }}
			>
				¿Ya tienes una cuenta?{' '}
				<Link
					href="/iniciar-sesion"
					component={NextLink}
					style={{
						color: '#377AB8',
						textDecoration: 'none',
						fontWeight: 'bold',
					}}
				>
					Iniciar sesión
				</Link>
			</Typography>
		</>
	);
};

export default RegisterPage;
