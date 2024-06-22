'use client';
import { useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';

import { ProductDetails } from '@/components';
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

	if (error || !product) {
		setOpenSnackbar(true);
		return (
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
		);
	}

	return (
		<Box>
			<ProductDetails product={product} isLoading={isLoading} />
		</Box>
	);
};

export default ProductPage;
