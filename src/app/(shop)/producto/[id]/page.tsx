'use client';
import { useState, useEffect } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';

import {
	CommentsSection,
	ProductDetails,
	ProductImagesSwiper,
} from '@/components';
import { useGetProductByIdQuery, useGetProductReviewsQuery } from '@/store';
import LogoLoader from '@/components/logo/LogoLoader';

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
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						mx: 10,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							py: 5,
						}}
					>
						<Grid
							container
							spacing={4}
							sx={{
								maxWidth: { xs: '100%', md: '80%' },
								gap: 2,
							}}
						>
							<Grid item xs={12} md={6}>
								<ProductImagesSwiper
									images={[]}
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
					</Box>
					<CommentsSection comments={reviews} />
				</Box>
			)}
		</>
	);
};

export default ProductPage;
