import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';

import { RegisterForm } from '@/components';

export const RegisterPage = () => {
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
