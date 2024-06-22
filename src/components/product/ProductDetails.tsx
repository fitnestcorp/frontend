'use client';
import {
	Box,
	Button,
	Grid,
	Rating,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	Skeleton,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { Product } from '@/interfaces';
import { parse } from 'path';

interface Props {
	product: Product;
	isLoading?: boolean;
}

export const ProductDetails = ({ product, isLoading }: Props) => {
	if (isLoading) {
		return (
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Skeleton variant="text" width="80%" height={50} />
					<Skeleton variant="text" width="100%" height={150} />
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
						<Skeleton
							variant="rectangular"
							width={200}
							height={30}
						/>
					</Box>
					<Skeleton variant="rectangular" width="100%" height={50} />
					<Skeleton variant="text" width="40%" height={30} />
					<Skeleton variant="rectangular" width="100%" height={50} />
				</Grid>
			</Grid>
		);
	}

	const { name, description, price, status, reviews } = product;

	const formatCurrency = (value: number) => {
		const formattedValue = new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);

		return formattedValue.replace('COP', '').trim();
	};

	return (
		<>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				fontWeight="bold"
			>
				{name}
			</Typography>
			<Typography variant="body1" color="text.primary" paragraph>
				{description}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: 2,
				}}
			>
				<Rating
					name="read-only"
					value={reviews.reduce(
						(acc, review) => acc + review.score,
						0
					)}
					readOnly
					precision={0.5}
				/>
				<Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
					{reviews.length} reseñas
				</Typography>
			</Box>
			<ToggleButtonGroup
				color="primary"
				exclusive
				sx={{
					mb: 2,
					'& .MuiToggleButton-root': {
						borderRadius: '30px',
						textTransform: 'none',
						fontSize: '0.875rem',
						mx: 0.5,
						py: 0.5,
						px: 1,
					},
				}}
			>
				<ToggleButton value="149.9lbs" size="small" selected>
					Juego de 149.9 lbs
				</ToggleButton>
				<ToggleButton value="99.2lbs" size="small">
					Juego de 99.2 lbs
				</ToggleButton>
				<ToggleButton value="170lbs" size="small">
					Juego de 170 lbs
				</ToggleButton>
			</ToggleButtonGroup>
			<Typography
				variant="h5"
				component="div"
				sx={{ fontWeight: 'bold', mb: 2 }}
			>
				{formatCurrency(price)}
			</Typography>
			<Button
				variant="contained"
				color="primary"
				disabled={status === 'Agotado'}
				startIcon={<AddShoppingCart />}
				fullWidth
				sx={{ borderRadius: '8px', py: 1.5 }}
			>
				{status === 'Agotado' ? 'Agotado' : 'Agregar al carrito'}
			</Button>
		</>
	);
};
