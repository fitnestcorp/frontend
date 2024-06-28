import { Box, Container, Grid, Link, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{ backgroundColor: 'black', color: 'white', py: 5, mt: 'auto' }}
		>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={6}>
						<Typography
							variant="h4"
							component="h3"
							sx={{
								fontWeight: 'bold',
								color: 'primary',
								textAlign: { xs: 'center', sm: 'left' },
							}}
							gutterBottom
						>
							FITNEST
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: {
									xs: 'center',
									sm: 'flex-start',
								},
								mt: 2,
							}}
						>
							<LocationOnIcon sx={{ mr: 1, color: 'gray.300' }} />
							<Typography variant="body1" color="gray.300">
							Cl. 18 #122-135, Barrio Pance, Cali, Valle del Cauca
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: {
									xs: 'center',
									sm: 'flex-start',
								},
								mt: 2,
							}}
						>
							<PhoneIcon sx={{ mr: 1, color: 'gray.300' }} />
							<Typography variant="body1">
								Teléfono:
								<Box
									component="span"
									sx={{
										fontWeight: 'bold',
										color: 'secondary',
									}}
								>
									(+57) 3182044848
								</Box>
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: {
									xs: 'center',
									sm: 'flex-start',
								},
								mt: 2,
							}}
						>
							<EmailIcon sx={{ mr: 1, color: 'gray.300' }} />
							<Typography variant="body1">
								Email:
								<Box
									component="span"
									sx={{
										fontWeight: 'bold',
										color: 'secondary',
									}}
								>
									fitnestcorp@gmail.com
								</Box>
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}
						md={3}
						sx={{ textAlign: { xs: 'center', sm: 'left' } }}
					>
						<Typography variant="h6" component="h4" gutterBottom>
							Información
						</Typography>
						<Box>
							<Link
								href="/nosotros"
								color="gray.300"
								underline="hover"
								display="block"
								mt={2}
							>
								Sobre nosotros
							</Link>
							
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}
						md={3}
						sx={{ textAlign: { xs: 'center', sm: 'left' } }}
					>
						<Typography variant="h6" component="h4" gutterBottom>
							Atención al cliente
						</Typography>
						<Box>
							<Link
								href="/terminos"
								color="gray.300"
								underline="hover"
								display="block"
								mt={2}
							>
								Términos y condiciones
							</Link>
							<Link
								href="/reembolsos"
								color="gray.300"
								underline="hover"
								display="block"
								mt={2}
							>
								Reembolsos y devoluciones
							</Link>
							<Link
								href="/pqrs"
								color="gray.300"
								underline="hover"
								display="block"
								mt={2}
							>
								PQRs
							</Link>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
