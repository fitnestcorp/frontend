'use client';
import { useState, useEffect } from 'react';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';

import {
	AddComment,
	CommentsSection,
	LogoLoader,
	ProductDetails,
	ProductImagesSwiper,
} from '@/components';
import { useGetProductByIdQuery, useGetProductReviewsQuery } from '@/store';
import NotFoundPage from '../not-found';

interface Props {
	params: {
		id: string;
	};
}

/**
 * ProductPage page displays detailed information about a product, including images, details, and user comments.
 * 
 * @page
 * @param {Props} props - The props for the ProductPage page.
 * @param {Object} props.params - The URL parameters.
 * @param {string} props.params.id - The ID of the product.
 * @returns {JSX.Element} A React component that displays the product page.
 * 
 * @example
 * <ProductPage params={{ id: '350b39ae-417c-4eee-a0d9-c951eec67a54' }} />
 */
const ProductPage = ({ params }: Props) => {
	const { id } = params;
	const { data: product, error, isLoading } = useGetProductByIdQuery(id);

	const {
		data: dataReviews,
		isLoading: isLoadingReviews,
		refetch,
	} = useGetProductReviewsQuery({ page: 1, limit: 5, productId: id });
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

	if (!product) {
		return <NotFoundPage />;
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
					<Box sx={{ mt: 10 }}>
						<Typography
							variant="h5"
							component="div"
							sx={{ mb: 3, fontWeight: 'bold' }}
						>
							Comentarios
						</Typography>
						<AddComment refetch={refetch} productId={id} />
						<CommentsSection comments={reviews} />
					</Box>
				</Box>
			)}
		</>
	);
};

export default ProductPage;
