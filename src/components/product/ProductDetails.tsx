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

interface Props {
	product: Product;
	isLoading?: boolean;
}

export const ProductDetails = ({ product, isLoading }: Props) => {
	if (isLoading) {
		return (
			<Grid container>
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

	const { name, description, price, status, reviews, type } = product;

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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 1.5,
			}}
		>
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
					mb: 1,
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
					{reviews.length} reseña(s)
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
						px: 1,
					},
				}}
			>
				<ToggleButton value={type} size="small" selected>
					{type}
				</ToggleButton>
			</ToggleButtonGroup>
			<Typography
				variant="h5"
				component="div"
				sx={{ fontWeight: 'bold', mb: 1 }}
			>
				{formatCurrency(price)}
			</Typography>
			<Button
				variant="contained"
				color="primary"
				disabled={status === 'Agotado'}
				startIcon={<AddShoppingCart />}
				fullWidth
				sx={{ borderRadius: '8px', py: 1 }}
			>
				{status === 'Agotado' ? 'Agotado' : 'Agregar al carrito'}
			</Button>
		</Box>
	);
};

export default ProductDetails;
