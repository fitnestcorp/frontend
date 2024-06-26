'use client';
import { useState, useEffect } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';

import {
	CommentsSection,
	LogoLoader,
	ProductDetails,
	ProductImagesSwiper,
} from '@/components';
import { useGetProductByIdQuery, useGetProductReviewsQuery } from '@/store';

interface Props {
	params: {
		id: string;
	};
}

export const ProductPage = ({ params }: Props) => {
	const { id } = params;
	const { data: product, error, isLoading } = useGetProductByIdQuery(id);
	const { data: dataReviews, isLoading: isLoadingReviews } =
		useGetProductReviewsQuery({ page: 1, limit: 5, productId: id });
	const reviews = dataReviews?.[0] || [];

	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	useEffect(() => {
		if (error) {
			setOpenSnackbar(true);
		}
	}, [error]);

	if (isLoading) {
		return <LogoLoader />;
	}

	return (
		<>
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
				<Box
					sx={{
						
						py: 6,
						px: { xs: 2, md: 4, lg: 8 },
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Grid container spacing={4}>
						<Grid item xs={12} md={7}>
							<ProductImagesSwiper
								images={product.image_urls}
								name={product.name}
							/>
						</Grid>

						<Grid item xs={12} md={5}>
							<ProductDetails
								product={product}
								isLoading={isLoading}
							/>
						</Grid>
					</Grid>
					<CommentsSection comments={reviews} />
				</Box>
			)}
		</>
	);
};

export default ProductPage;
