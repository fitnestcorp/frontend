'use client';
import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography, Link } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store';
import { LoginForm } from '@/components';

const OauthPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const queryParams = new URLSearchParams(window.location.search);
				const params = Object.fromEntries(queryParams.entries());
				localStorage.setItem('token', params.token);
				console.log(params);
				const response = await fetch(
					(process.env.BACKEND_URL || 'http://localhost:3000') +
						'/user/status',
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${params.token}`,
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const result = await response.json();
				dispatch(setUser({ user: result }));
				router.push('/');
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dispatch, router]);

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

export default OauthPage;
