import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Rating,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { ProductSwiper } from './ProductSwiper';
import { Product } from '@/interfaces';

interface Props {
	product: Product;
}

export const ProductDetails = ({ product }: Props) => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
			<Card
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '1200px',
					borderRadius: '16px',
					overflow: 'hidden',
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<ProductSwiper
							images={product!.images}
							name={product!.name}
						/>
					</Grid>
					<Grid item xs={12} md={8}>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h4"
								component="h1"
								gutterBottom
							>
								{product!.name}
							</Typography>
							<Typography
								variant="body1"
								color="text.primary"
								paragraph
							>
								{product!.description}
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
									value={product!.rate}
									readOnly
									precision={0.5}
								/>
								<Typography
									variant="body2"
									color="text.primary"
									sx={{ ml: 1 }}
								>
									{product!.reviews.length} reseñas
								</Typography>
							</Box>
							<ToggleButtonGroup
								color="primary"
								exclusive
								sx={{ mb: 2 }}
							>
								<ToggleButton value="149.9lbs">
									Juego de 149.9 lbs
								</ToggleButton>
								<ToggleButton value="99.2lbs">
									Juego de 99.2 lbs
								</ToggleButton>
								<ToggleButton value="170lbs">
									Juego de 170 lbs
								</ToggleButton>
							</ToggleButtonGroup>
							<Typography
								variant="h5"
								component="div"
								sx={{ fontWeight: 'bold', mb: 2 }}
							>
								${product!.price}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								disabled={product!.stock === 0}
								startIcon={<AddShoppingCart />}
								sx={{ borderRadius: '8px' }}
							>
								{product!.stock === 0
									? 'Agotado'
									: 'Agregar al carrito'}
							</Button>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</Box>
	);
};
