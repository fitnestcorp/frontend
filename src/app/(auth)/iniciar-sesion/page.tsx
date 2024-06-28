import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';

import { LoginForm } from '@/components';

/**
 * LoginPage component.
 * This page allows users to log in to their account.
 * It displays a login form and a link to create a new account if the user doesn't have one.
 *
 * @page
 * @returns {JSX.Element} The rendered login page component.
 */
const LoginPage : React.FC = (): JSX.Element => {
	return (
		<>	
			{/* Page title */}
			<Typography
				component="h1"
				variant="h5"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}
			>
				Iniciar Sesión
			</Typography>

			 {/* Login form */}
			<LoginForm />

			{/* Link to create a new account */}
			<Typography
				variant="body2"
				textAlign="center"
				mt={2}
				sx={{ color: 'text.primary' }}
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
		</>
	);
};

export default LoginPage;
