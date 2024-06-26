'use client';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Product } from '@/interfaces';
import ProductGrid from '@/components/products/ProductGrid';
import LogoLoader from '@/components/logo/LogoLoader';
import Filters from '@/components/products/Filters';
import { useGetProductsQuery } from '@/store/services/productApi';

export const AllProducts = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [products, setProducts] = useState<Product[]>([]);
	const [countProducts, setCountProducts] = useState(0);
	const [selectedFilter, setSelectedFilter] = useState('MÁS VENDIDOS');
	const [filterParams, setFilterParams] = useState({ filter: '', order: 'DESC' as 'ASC' | 'DESC' });

	const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery({ ...filterParams, page, limit });

	useEffect(() => {
		if (productsData && Array.isArray(productsData) && productsData.length === 2) {
			const [objectsList, totalCount] = productsData;
			if (Array.isArray(objectsList)) {
				setProducts(objectsList);
				setCountProducts(totalCount);
			}
		} else if (productsError) {
			console.error('Error fetching products:', productsError);
		}
	}, [productsData, productsError]);

	const handleSelectFilter = (filter: string) => {
		switch (filter) {
			case 'MENOR A MAYOR PRECIO':
				setFilterParams({ filter: 'price', order: 'ASC' });
				break;
			case 'MAYOR A MENOR PRECIO':
				setFilterParams({ filter: 'price', order: 'DESC' });
				break;
			case 'MEJOR VOTADOS':
				setFilterParams({ filter: 'rating', order: 'DESC' });
				break;
			case 'PEOR VOTADOS':
				setFilterParams({ filter: 'rating', order: 'ASC' });
				break;
			case 'MÁS VENDIDOS':
				setFilterParams({ filter: 'sold_units', order: 'DESC' });
				break;
			case 'MENOS VENDIDOS':
				setFilterParams({ filter: 'sold_units', order: 'ASC' });
				break;
			default:
				setFilterParams({ filter: '', order: 'DESC' });
				break;
		}
		setSelectedFilter(filter);
	};

	// Mostrar el loader mientras los productos están cargando
	if (productsLoading) {
		return <LogoLoader />;
	}

	return (
		<Box>
			<Typography variant="h3" sx={{ fontWeight: 'bold', my: 2 }}>
				{'TODOS NUESTROS PRODUCTOS'}
			</Typography>
			<Filters onSelectFilter={handleSelectFilter} />
			<ProductGrid products={products} />
		</Box>
	);
};

export default AllProducts;
