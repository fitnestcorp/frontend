'use client';
import { useState, useEffect } from 'react';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';

import { ProductDetails, ProductImagesSwiper } from '@/components';
import { useGetProductByIdQuery } from '@/store';

interface Props {
	params: {
		id: string;
	};
}

export const ProductPage = ({ params }: Props) => {
	const { id } = params;
	const { data: product, error, isLoading } = useGetProductByIdQuery(id);

	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	useEffect(() => {
		if (error) {
			setOpenSnackbar(true);
		}
	}, [error]);

	return (
		<Box>
			{error || !product ? (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={openSnackbar}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
				>
					<Alert
						severity="error"
						sx={{ width: '100%' }}
						variant="filled"
						onClose={handleCloseSnackbar}
					>
						Lo sentimos, ha ocurrido un error al cargar el producto
					</Alert>
				</Snackbar>
			) : (
				<Grid
					container
					spacing={4}
					sx={{
						maxWidth: { xs: '100%', md: '80%' },
						py: 4,
					}}
				>
					<Grid item xs={12} md={6}>
						<ProductImagesSwiper images={product.image_url} />
					</Grid>
					<Grid item xs={12} md={6}>
						<ProductDetails
							product={product}
							isLoading={isLoading}
						/>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};

export default ProductPage;
