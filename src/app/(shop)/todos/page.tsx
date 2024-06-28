'use client';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

import { Product } from '@/interfaces';
import { Banner, Filters, LogoLoader, ProductGrid } from '@/components';
import { useGetProductsQuery } from '@/store';

/**
 * AllProducts component renders a page that displays all the products available, with filtering and pagination functionality.
 * 
 * @page
 * @returns {JSX.Element} A React component that displays a list of all products with filters and pagination.
 */
const AllProducts = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(16);
	const [products, setProducts] = useState<Product[]>([]);
	const [countProducts, setCountProducts] = useState(0);
	const [selectedFilter, setSelectedFilter] = useState('Mejor votados');
	const [filterParams, setFilterParams] = useState({
		filter: 'rating',
		order: 'DESC' as 'ASC' | 'DESC',
		page: 1,
		limit: 16,
	});

	const {
		data: productsData,
		error: productsError,
		isLoading: productsLoading,
	} = useGetProductsQuery({ ...filterParams });

	useEffect(() => {
		if (
			productsData &&
			Array.isArray(productsData) &&
			productsData.length === 2
		) {
			const [objectsList, totalCount] = productsData;
			if (Array.isArray(objectsList)) {
				setProducts(objectsList);
				setCountProducts(totalCount);
			}
		} else if (productsError) {
			console.error('Error fetching products:', productsError);
		}
	}, [productsData, productsError]);


	/**
	 * Handles the selection of a filter and updates the filter parameters.
	 * 
	 * @param {string} filter - The selected filter.
	 */
	const handleSelectFilter = (filter: string) => {
		switch (filter) {
			case 'Menos costosos':
				setFilterParams({
					filter: 'price',
					order: 'ASC',
					page: 1,
					limit: 16,
				});
				break;
			case 'Más costosos':
				setFilterParams({
					filter: 'price',
					order: 'DESC',
					page: 1,
					limit: 16,
				});
				break;
			case 'Mejor votados':
				setFilterParams({
					filter: 'rating',
					order: 'DESC',
					page: 1,
					limit: 16,
				});
				break;
			case 'Peor votados':
				setFilterParams({
					filter: 'rating',
					order: 'ASC',
					page: 1,
					limit: 16,
				});
				break;
			case 'Más vendidos':
				setFilterParams({
					filter: 'sold_units',
					order: 'DESC',
					page: 1,
					limit: 16,
				});
				break;
			case 'Menos vendidos':
				setFilterParams({
					filter: 'sold_units',
					order: 'ASC',
					page: 1,
					limit: 16,
				});
				break;
			default:
				setFilterParams({
					filter: '',
					order: 'DESC',
					page: 1,
					limit: 16,
				});
				break;
		}
		setSelectedFilter(filter);
	};

	/**
	 * Handles the page change for pagination.
	 * 
	 * @param {React.ChangeEvent<unknown>} event - The change event.
	 * @param {number} value - The new page number.
	 */
	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	if (productsLoading) {
		return <LogoLoader />;
	}

	return (
		<>
			<Banner image={'https://fitnest-bucket.s3.amazonaws.com/pexels-leonardho-1552242.jpg'} title={'Todos nuestros productos'} />
			<Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
				{/* <Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						mt: 6,
						mb: 2,
					}}
				>
					
				</Box> */}
				<Filters onSelectFilter={handleSelectFilter} />
				<ProductGrid products={products} />
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
					<Pagination
						count={Math.ceil(countProducts / limit)}
						page={page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Box>
			</Box>
		</>
	);
};

export default AllProducts;
