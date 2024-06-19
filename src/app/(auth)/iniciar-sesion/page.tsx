import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';

import { LoginForm } from '@/components';

export const LoginPage = () => {
	return (
		<>
			<Typography
				component="h1"
				variant="h5"
				textAlign="center"
				gutterBottom
				sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}
			>
				Iniciar Sesión
			</Typography>
			<LoginForm />
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
